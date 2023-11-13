package handlers

import (
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/app"
	"github.com/gin-gonic/gin"
)

func RegisterAppHandler(g *gin.RouterGroup) {
	appService := app.CreateAppService()

	g.GET(`/live`, appService.LiveCheck)
}
