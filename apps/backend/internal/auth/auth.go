package auth

import (
	"encoding/json"
	"errors"
	"io"
	"os"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage/repositories"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type authService struct {
	storage *storage.Storage
}

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[auth]`,
		Level:  log.DebugLevel,
	})
)

var Secret string

// parseENV parses the environment variables.
func parseENV() {
	env, exist := os.LookupEnv(`SECRET`)
	if !exist {
		logger.Fatal(`Error loading SECRET from .env file`)
	}
	Secret = env
}

// CreateAuthService creates an instance of the authService struct and returns it.
func CreateAuthService(s *storage.Storage) *authService {
	parseENV()

	return &authService{
		storage: s,
	}
}

type UserData struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// LoginOrRegister handles the login or registration process.
//
// It decodes the body of the request and checks the username and password
// provided. If the username does not exist, it registers the user. If the
// username exists, it checks the password. If the credentials are invalid, it
// returns an appropriate error response. If the credentials are valid, it adds
// JWT tokens to cookies and returns the user's username and role.
//
// Parameters:
// - c: the gin.Context object representing the HTTP request and response.
func (s *authService) LoginOrRegister(c *gin.Context) {
	// Check body
	if c.Request.Body == nil {
		logger.Error(`body not found`)
		c.String(400, `body not found`)
		return
	}

	// Read body
	b, err := io.ReadAll(c.Request.Body)
	if err != nil {
		logger.Error(`failed to read body`, `err`, err)
		c.String(500, `failed to read body`)
		return
	}

	// Unmarshal
	var body UserData
	if err := json.Unmarshal(b, &body); err != nil {
		logger.Error(`failed to unmarshal body`, `err`, err)
		c.String(500, `failed to unmarshal body`)
		return
	}

	// Get user by username
	user, err := s.storage.User.GetUserByUsername(body.Username)
	if err != nil {
		logger.Error(`failed to get user`, `err`, err)
		c.String(500, `failed to get user`)
		return
	}

	if user == nil {
		// If user doesn't exist create
		// Register user
		if err := s.registerUser(body.Username, body.Password); err != nil {
			logger.Error(`failed to register user`, `err`, err)
			c.String(500, `failed to register user`)
			return
		}

		// Add JWT tokens to cookies
		if err := s.addJWTCookies(body, c); err != nil {
			logger.Error(`failed to add JWT tokens to cookies`, `err`, err)
			c.String(500, `failed to add JWT tokens to cookies`)
			return
		}

		// Get actual user info
		newUser, err := s.storage.User.GetUserByUsername(body.Username)
		if err != nil {
			logger.Error(`failed to get user`, `err`, err)
			c.String(500, `failed to get user`)
			return
		}

		c.JSON(200, gin.H{
			`username`: newUser.Username,
			`role`:     newUser.Role,
		})
		return
	} else {
		// Check password
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
		if err != nil {
			logger.Error(`invalid credentials`, `err`, err)
			c.String(403, `invalid credentials`)
			return
		}
	}

	// Add JWT tokens to cookies
	if err := s.addJWTCookies(body, c); err != nil {
		logger.Error(`failed to add JWT tokens to cookies`, `err`, err)
		c.String(500, `failed to add JWT tokens to cookies`)
		return
	}

	logger.Debug(`logged in`, `username`, user.Username)

	c.JSON(200, gin.H{
		`username`: user.Username,
		`role`:     user.Role,
	})
}

// Register handles the registration process for a user.
//
// It decodes the request body and checks if the necessary fields are present. If
// the fields are valid, it creates a new user and adds JWT tokens to the cookies.
// Finally, it returns the registered user's information in JSON format.
//
// Parameters:
// - c: the gin.Context object representing the HTTP request and response.
func (s *authService) Register(c *gin.Context) {
	// Check body
	if c.Request.Body == nil {
		logger.Error(`body not found`)
		c.String(400, `body not found`)
		return
	}

	// Read body
	b, err := io.ReadAll(c.Request.Body)
	if err != nil {
		logger.Error(`failed to read body`, `err`, err)
		c.String(500, `failed to read body`)
		return
	}
	defer c.Request.Body.Close()

	// Unmarshal
	var body UserData
	if err := json.Unmarshal(b, &body); err != nil {
		logger.Error(`failed to unmarshal body`, `err`, err)
		c.String(500, `failed to unmarshal body`)
		return
	}

	// Register user
	if err := s.registerUser(body.Username, body.Password); err != nil {
		logger.Error(`failed to register user`, `err`, err)
		c.String(500, `failed to register user`)
		return
	}

	// Add JWT tokens to cookies
	if err := s.addJWTCookies(body, c); err != nil {
		logger.Error(`failed to add JWT tokens to cookies`, `err`, err)
		c.String(500, `failed to add JWT tokens to cookies`)
		return
	}

	// Get actual user info
	newUser, err := s.storage.User.GetUserByUsername(body.Username)
	if err != nil {
		logger.Error(`failed to get user`, `err`, err)
		c.String(500, `failed to get user`)
		return
	}

	c.JSON(200, gin.H{
		`username`: newUser.Username,
		`role`:     newUser.Role,
	})
}

func (s *authService) GetUserData(c *gin.Context) {
	// Get cookies
	a, err := c.Cookie(`access_token`)
	if err != nil {
		logger.Error(`failed to get access token`, `err`, err)
		c.String(400, `failed to get access token`)
		return
	}
	r, err := c.Cookie(`refresh_token`)
	if err != nil {
		logger.Error(`failed to get refresh token`, `err`, err)
		c.String(400, `failed to get refresh token`)
		return
	}

	if a == `` || r == `` {
		logger.Error(`failed to get user data`)
		c.String(400, `failed to get user data`)
		return
	}

	// Verify and decode
	claims := jwt.MapClaims{}
	if _, err := jwt.ParseWithClaims(a, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(Secret), nil
	}); err != nil {
		logger.Error(`failed to verify access token`, `err`, err)
		c.String(400, `failed to get user data`)
		return
	}

	// Check username and role
	var username string
	var role string

	for key, val := range claims {
		if key == `username` {
			username = val.(string)
		}
		if key == `role` {
			role = val.(string)
		}
	}

	if username == `` || role == `` {
		logger.Error(`failed to get user data`)
		c.String(400, `failed to get user data`)
		return
	}

	// Get actual user info
	user, err := s.storage.User.GetUserByUsername(username)
	if err != nil {
		logger.Error(`failed to get user`, `err`, err)
		c.String(500, `failed to get user`)
		return
	}

	if user == nil || user.Username == `` {
		logger.Error(`failed to get user data`)
		c.String(400, `failed to get user data`)
		return
	}

	// Add JWT tokens to cookies
	if err := s.addJWTCookies(UserData{Username: user.Username}, c); err != nil {
		logger.Error(`failed to add JWT tokens to cookies`, `err`, err)
		c.String(500, `failed to add JWT tokens to cookies`)
		return
	}

	c.JSON(200, gin.H{
		`username`: user.Username,
		`role`:     user.Role,
	})
}

func (s *authService) registerUser(username string, password string) error {
	// Get user by username
	user, err := s.storage.User.GetUserByUsername(username)
	if err != nil {
		return errors.New(`failed to get user`)
	}

	if user != nil {
		return errors.New(`user already exists`)
	}

	// Create user
	if err := s.storage.User.CreateUser(&repositories.UserModel{
		Username: username,
		Password: password,
		Role:     `user`,
	}); err != nil {
		return errors.New(`failed to create user`)
	}

	logger.Debug(`registered`, `username`, username)

	return nil
}

// addJWTCookies generates and adds JWT cookies to the provided gin.Context.
//
// It takes in the body UserData containing the username and generates JWT access
// and refresh tokens. The generated refresh token is appended to the user's existing
// refresh tokens and the user is updated in the User. If the user update
// fails, an error is returned. The generated access and refresh tokens are then set
// as cookies in the gin.Context with a specified expiration time.
//
// Parameters:
// - body: UserData containing the username.
// - c: gin.Context to add the JWT cookies to.
//
// Returns:
// - error: Returns an error if the user update fails, otherwise returns nil.
func (s *authService) addJWTCookies(body UserData, c *gin.Context) error {
	a, r := s.generateJWTTokens(body.Username, `user`)

	user, err := s.storage.User.GetUserByUsername(body.Username)
	if err != nil {
		return err
	}
	user.RefreshTokens = append(user.RefreshTokens, r)
	err = s.storage.User.UpdateUser(user)
	if err != nil {
		return err
	}

	c.SetCookie(`access_token`, a, 60*60*24, `/`, `localhost`, true, true)
	c.SetCookie(`refresh_token`, r, 60*60*24, `/`, `localhost`, true, true)

	return nil
}

// generateJWTTokens generates JWT tokens for the given username and role.
//
// Parameters:
// - username: the username for which the tokens are generated.
// - role: the role associated with the user.
//
// Returns:
// - accessTokenString: the access token as a string.
// - refreshTokenString: the refresh token as a string.
func (s *authService) generateJWTTokens(username string, role string) (string, string) {
	// Generate tokens
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		`username`: username,
		`role`:     role,
	})
	refreshToken := jwt.New(jwt.SigningMethodHS256)

	// Sign tokens
	accessTokenString, _ := accessToken.SignedString([]byte(Secret))
	refreshTokenString, _ := refreshToken.SignedString([]byte(Secret))

	return accessTokenString, refreshTokenString
}
