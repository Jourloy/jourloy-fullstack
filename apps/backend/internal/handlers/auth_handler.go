package handlers

import (
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/auth"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/gin-gonic/gin"
)

func RegisterAuthHandler(g *gin.RouterGroup, s *storage.Storage) {
	authService := auth.CreateAuthService(s)

	// Login or register
	g.POST(`/login`, authService.LoginOrRegister)

	// Register
	g.POST(`/register`, authService.Register)

	// Get user
	g.POST(`/user`, authService.GetUserData)
}
