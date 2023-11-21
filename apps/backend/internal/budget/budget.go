package budget

import (
	"encoding/json"
	"io"
	"os"
	"sort"
	"time"

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
	PeriodLimit int    `json:"periodLimit"`
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

type BudgetResponse struct {
	ID          uint                      `json:"id"`
	Name        string                    `json:"name"`
	Limit       int                       `json:"limit"`
	PeriodLimit int                       `json:"periodLimit"`
	Period      string                    `json:"period"`
	StartDate   string                    `json:"startDate"`
	CreatedAT   string                    `json:"createdAt"`
	UpdatedAT   string                    `json:"updatedAt"`
	DaysPassed  int                       `json:"daysPassed"`
	DaysLeft    int                       `json:"daysLeft"`
	TodayLimit  int                       `json:"todayLimit"`
	MonthIncome int                       `json:"monthIncome"`
	MonthSpend  int                       `json:"monthSpend"`
	Spends      []repositories.SpendModel `json:"spends"`
}

func (s *budgetService) GetBudgets(c *gin.Context) {
	// Check user
	user, ok := s.check(c)
	if !ok {
		return
	}

	// Get budgets
	budgets := s.storage.Budget.GetBudgetsByUserID(user.ID)

	// Sort budgets
	sort.SliceStable(budgets, func(i, j int) bool {
		return budgets[i].ID < budgets[j].ID
	})

	budgetsResponse := []BudgetResponse{}
	for _, budget := range budgets {
		budgetsResponse = append(budgetsResponse, *s.calculateBudget(&budget))
	}

	c.JSON(200, budgetsResponse)
}

func (s *budgetService) calculateBudget(budget *repositories.BudgetModel) *BudgetResponse {
	// Calculate days passed
	startDay, err := time.Parse(`2006-01-02T15:04:05.000000Z`, budget.StartDate)
	if err != nil {
		logger.Error(`failed to parse start date`, `err`, err)
		return nil
	}
	today := time.Now()
	daysPassed := int(today.Sub(startDay).Hours()/24) + 1

	// Calculate today limit
	spendsCost := 0
	monthSpend := 0
	monthIncome := 0
	for _, spend := range budget.Spends {
		spendsCost += spend.Cost

		spendDate, err := time.Parse(`2006-01-02T15:04:05.000000Z`, spend.CreatedAT)
		if err != nil {
			logger.Error(`failed to parse spend date`, `err`, err)
			return nil
		}

		if spendDate.Month() != today.Month() {
			continue
		}

		if spend.Cost > 0 {
			monthSpend += spend.Cost
		} else {
			monthIncome += spend.Cost
		}
	}
	todayLimit := budget.PeriodLimit*daysPassed + spendsCost

	// Calculate days left
	daysLeft := budget.Limit/budget.PeriodLimit - daysPassed

	return &BudgetResponse{
		ID:          budget.ID,
		Name:        budget.Name,
		Limit:       budget.Limit,
		PeriodLimit: budget.PeriodLimit,
		Period:      budget.Period,
		StartDate:   budget.StartDate,
		CreatedAT:   budget.CreatedAT,
		UpdatedAT:   budget.UpdatedAT,
		DaysPassed:  daysPassed,
		DaysLeft:    daysLeft,
		TodayLimit:  todayLimit,
		Spends:      budget.Spends,
		MonthSpend:  monthSpend,
		MonthIncome: monthIncome,
	}
}

type BudgetUpdateData struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Limit       int    `json:"limit"`
	PeriodLimit int    `json:"periodLimit"`
	Period      string `json:"period"`
	StartDate   string `json:"startDate"`
}

func (s *budgetService) UpdateBudget(c *gin.Context) {
	// Check user
	user, ok := s.check(c)
	if !ok {
		return
	}

	// Check body
	var body BudgetUpdateData
	if ok := s.parseBody(c, &body); !ok {
		return
	}

	// Update budget
	err := s.storage.Budget.UpdateBudget(&repositories.BudgetModel{
		ID:          body.ID,
		UserID:      user.ID,
		Name:        body.Name,
		Limit:       body.Limit,
		PeriodLimit: body.PeriodLimit,
		Period:      body.Period,
		StartDate:   body.StartDate,
	})
	if err != nil {
		logger.Error(`failed to update budget`, `err`, err)
		c.String(500, `failed to update budget`)
		return
	}

	c.String(200, `ok`)
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
	user, err := s.storage.User.GetUserByUsername(username.(string))
	if user == nil || err != nil {
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
