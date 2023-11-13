package auth

import (
	"os"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage/repositories"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/schema"
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
	decoder = schema.NewDecoder()
)

var Secret string

func parseENV() {
	env, exist := os.LookupEnv(`SECRET`)
	if !exist {
		logger.Fatal(`Error loading SECRET from .env file`)
	}
	Secret = env
}

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

func (s *authService) LoginOrRegister(c *gin.Context) {
	// Decode body
	var body UserData
	if err := decoder.Decode(&body, c.Request.PostForm); err != nil {
		c.String(400, `body not found`)
		return
	}

	// Check body
	if body.Username == `nil` || body.Password == `` {
		c.String(401, `invalid credentials`)
		return
	}

	// Get user by username
	user := s.storage.UserRepository.GetUserByUsername(body.Username)

	if user == nil {
		// If user doesn't exist create
		s.Register(c)
		return
	} else {
		// Check password
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
		if err != nil {
			c.String(403, `invalid credentials`)
			return
		}
	}

	// Add JWT tokens to cookies
	if err := s.addJWTCookies(body, c); err != nil {
		c.String(500, `failed to add JWT tokens to cookies`)
		return
	}

	logger.Info(`logged in`, `username`, user.Username)

	c.JSON(200, gin.H{
		`username`: user.Username,
		`role`:     user.Role,
	})
}

// Register user
func (s *authService) Register(c *gin.Context) {
	// Decode body
	var body UserData
	if err := decoder.Decode(&body, c.Request.PostForm); err != nil {
		c.String(400, `body not found`)
		return
	}

	// Check body
	if body.Username == `nil` || body.Password == `` {
		c.String(401, `invalid credentials`)
		return
	}

	// Create user
	if err := s.storage.UserRepository.CreateUser(&repositories.UserModel{
		Username: body.Username,
		Password: body.Password,
		Role:     `user`,
	}); err != nil {
		c.String(500, `failed to create user`)
		return
	}

	// Add JWT tokens to cookies
	if err := s.addJWTCookies(body, c); err != nil {
		c.String(500, `failed to add JWT tokens to cookies`)
		return
	}

	logger.Info(`registered`, `username`, body.Username)

	// Get actual user info
	user := s.storage.UserRepository.GetUserByUsername(body.Username)

	c.JSON(200, gin.H{
		`username`: user.Username,
		`role`:     user.Role,
	})
}

// Add JWT tokens to cookies
func (s *authService) addJWTCookies(body UserData, c *gin.Context) error {
	a, r := s.generateJWTTokens(body.Username, `user`)

	user := s.storage.UserRepository.GetUserByUsername(body.Username)
	user.RefreshTokens = append(user.RefreshTokens, r)
	err := s.storage.UserRepository.UpdateUser(user)
	if err != nil {
		return err
	}

	c.SetCookie(`access_token`, a, 60*60*24*7, `localhost`, `/`, true, true)
	c.SetCookie(`refresh_token`, r, 60*60*24*14, `localhost`, `/`, true, true)

	return nil
}

// Generate pair of tokens
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
