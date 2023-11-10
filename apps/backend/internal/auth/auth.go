package auth

import (
	"encoding/json"
	"errors"
	"io"
	"os"

	"github.com/Jourloy/jourloy-fullstack/apps/backend/internal/database"
	"github.com/Jourloy/jourloy-fullstack/apps/backend/internal/database/repository"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{Prefix: `[auth]`, Level: log.DebugLevel})
)

var (
	errBody = errors.New(`Body is invalid or missing`)
)

type AuthService struct {
	db *database.PostgresDatabase
}

func NewAuthService(db *database.PostgresDatabase) *AuthService {
	return &AuthService{
		db: db,
	}
}

type UserBody struct {
	Username  *string `json:"username"`
	Password  *string `json:"password"`
	GoogleID  *string `json:"google_id"`
	DiscordID *string `json:"discord_id"`
}

type UserResponse struct {
	Username     string
	Role         string
	Avatar       string
	RefreshToken string
	AccessToken  string
}

func (s *AuthService) Login(ctx *gin.Context) {
	respBody, err := io.ReadAll(ctx.Request.Body)
	if err != nil {
		logger.Error(err)
		ctx.String(500, err.Error())
	}
	defer ctx.Request.Body.Close()

	var userBody UserBody
	if err := json.Unmarshal(respBody, &userBody); err != nil {
		logger.Error(err)
		ctx.String(400, errBody.Error())
	}

	user, err := s.db.UserRepository.GetUserByUsername(*userBody.Username)
	if err != nil {
		logger.Warn(err)
		userModel, err := s.Register(userBody)
		if err != nil {
			logger.Error(err)
			ctx.String(400, err.Error())
		}
		ctx.JSON(200, userModel)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(*userBody.Password)); err != nil {
		logger.Error(err)
		ctx.String(401, err.Error())
	}

	ctx.JSON(200, user)
}

func (s *AuthService) Register(userBody UserBody) (repository.UserModel, error) {
	return s.db.UserRepository.CreateUser(*userBody.Username, `user`, userBody.Password, nil, nil)
}

func (s *AuthService) GenerateJWT(userBody UserBody, role *string) {

}
