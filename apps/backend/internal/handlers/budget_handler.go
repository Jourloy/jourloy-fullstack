package handlers

import (
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/budget"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/gin-gonic/gin"
)

func RegisterBudgetHandler(g *gin.RouterGroup, s *storage.Storage) {
	budgetService := budget.CreateBudgetService(s)

	g.POST(`/`, budgetService.CreateBudget)
	g.GET(`/all`, budgetService.GetBudgets)
}
