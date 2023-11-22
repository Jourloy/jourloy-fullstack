package handlers

import (
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/spend"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/gin-gonic/gin"
)

func RegisterSpendHandler(g *gin.RouterGroup, s *storage.Storage) {
	spendService := spend.CreateSpendService(s)

	// Create spend
	g.POST(`/`, spendService.CreateSpend)

	g.DELETE(`/:id`, spendService.DeleteSpend)
}
