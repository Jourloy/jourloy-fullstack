package spend

import (
	"encoding/json"
	"io"
	"os"
	"strconv"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage/repositories"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
)

type spendService struct {
	storage *storage.Storage
}

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[spend]`,
		Level:  log.DebugLevel,
	})
)

func CreateSpendService(storage *storage.Storage) *spendService {
	return &spendService{
		storage: storage,
	}
}

type BudgetCreateData struct {
	Cost        int     `json:"cost"`
	BudgetID    int     `json:"budgetId"`
	Category    string  `json:"category"`
	Description *string `json:"description"`
	Date        *string `json:"date"`
	Repeat      *string `json:"repeat"`
}

func (s *spendService) CreateSpend(c *gin.Context) {
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

	// Create spend
	err := s.storage.Spend.CreateSpend(&repositories.SpendModel{
		UserID:      uint(user.ID),
		BudgetID:    uint(body.BudgetID),
		Cost:        body.Cost,
		Category:    body.Category,
		Description: body.Description,
		Date:        body.Date,
		Repeat:      body.Repeat,
	})

	if err != nil {
		logger.Error(`failed to create spend`, `err`, err)
		c.String(500, `failed to create spend`)
		return
	}

	c.String(200, `ok`)
}

func (s *spendService) DeleteSpend(c *gin.Context) {
	// Check user
	user, ok := s.check(c)
	if !ok {
		return
	}

	// Get ID from url
	spendIDString := c.Param(`id`)

	// Parse id
	spendID, err := strconv.Atoi(spendIDString)
	if err != nil {
		logger.Error(`failed to parse id`, `err`, err)
		c.String(400, `failed to parse id`)
		return
	}

	// Get spend
	spend := s.storage.Spend.GetSpendByUserIDAndSpendID(uint(user.ID), uint(spendID))
	if spend == nil {
		logger.Error(`spend not found`)
		c.String(404, `spend not found`)
		return
	}

	if err := s.storage.Spend.DeleteSpend(spend); err != nil {
		logger.Error(`failed to delete spend`, `err`, err)
		c.String(500, `failed to delete spend`)
		return
	}

	c.String(200, `ok`)
}

func (s *spendService) check(c *gin.Context) (*repositories.UserModel, bool) {
	// Check user
	username, exist := c.Get(`username`)
	if !exist {
		logger.Error(`failed to get username`)
		c.String(403, `failed to get username`)
		return nil, false
	}

	// Get user
	user, err := s.storage.User.GetUserByUsername(username.(string))
	if user == nil || err != nil {
		logger.Error(`failed to get user`)
		c.String(500, `failed to get user`)
		return nil, false
	}

	return user, true
}

func (s *spendService) parseBody(c *gin.Context, body interface{}) bool {
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
