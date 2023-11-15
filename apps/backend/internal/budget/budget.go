package budget

import (
	"encoding/json"
	"io"
	"os"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage/repositories"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
)

type budgetService struct {
	storage *storage.Storage
}

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[budget]`,
		Level:  log.DebugLevel,
	})
)

func CreateBudgetService(storage *storage.Storage) *budgetService {
	return &budgetService{
		storage: storage,
	}
}

type BudgetCreateData struct {
	Name        string `json:"name"`
	Limit       int    `json:"limit"`
	PeriodLimit int    `json:"period_limit"`
	Period      string `json:"period"`
}

func (s *budgetService) CreateBudget(c *gin.Context) {
	// Check user
	user, ok := s.check(c)
	if !ok {
		return
	}

	// Check body
	var body BudgetCreateData
	if ok := s.parseBody(c, &body); !ok {
		return
	}

	// Create budget
	err := s.storage.Budget.CreateBudget(&repositories.BudgetModel{
		UserID:      user.ID,
		Name:        body.Name,
		Limit:       body.Limit,
		PeriodLimit: body.PeriodLimit,
		Period:      body.Period,
	})
	if err != nil {
		logger.Error(`failed to create budget`, `err`, err)
		c.String(500, `failed to create budget`)
		return
	}

	c.String(200, `ok`)
}

func (s *budgetService) GetBudgets(c *gin.Context) {
	// Check user
	user, ok := s.check(c)
	if !ok {
		return
	}

	// Get budgets
	budgets := s.storage.Budget.GetBudgetsByUserID(user.ID)

	c.JSON(200, budgets)
}

func (s *budgetService) check(c *gin.Context) (*repositories.UserModel, bool) {
	// Check user
	username, exist := c.Get(`username`)
	if !exist {
		logger.Error(`failed to get username`)
		c.String(403, `failed to get username`)
		return nil, false
	}

	// Get user
	user := s.storage.User.GetUserByUsername(username.(string))
	if user == nil {
		logger.Error(`failed to get user`)
		c.String(500, `failed to get user`)
		return nil, false
	}

	return user, true
}

func (s *budgetService) parseBody(c *gin.Context, body interface{}) bool {
	// Check body
	if c.Request.Body == nil {
		logger.Error(`body not found`)
		c.String(400, `body not found`)
		return false
	}

	// Read body
	b, err := io.ReadAll(c.Request.Body)
	if err != nil {
		logger.Error(`failed to read body`, `err`, err)
		c.String(500, `failed to read body`)
		return false
	}

	// Unmarshal
	if err := json.Unmarshal(b, &body); err != nil {
		logger.Error(`failed to unmarshal body`, `err`, err)
		c.String(500, `failed to unmarshal body`)
		return false
	}

	return true
}
