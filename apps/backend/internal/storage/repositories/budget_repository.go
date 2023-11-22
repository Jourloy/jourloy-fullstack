package repositories

import (
	"database/sql"
	"errors"
	"os"

	"github.com/charmbracelet/log"
	"github.com/jmoiron/sqlx"
)

type BudgetRepository struct {
	db *sqlx.DB
}

// Logger for the Budget
var budgetLogger = log.NewWithOptions(os.Stderr, log.Options{
	Prefix: `[database-budget]`,
	Level:  log.DebugLevel,
})

// Schema for the BudgetModel
var budgetSchema = `
CREATE TABLE IF NOT EXISTS budgets (
	id SERIAL PRIMARY KEY,
	user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
	name VARCHAR(255),
	current_limit INT,
	period_limit INT,
	period VARCHAR(255),
	start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

// Budget models with spend relationship
type BudgetModel struct {
	ID          uint   `db:"id"`
	UserID      uint   `db:"user_id"`
	Name        string `db:"name"`
	Limit       int    `db:"current_limit"`
	PeriodLimit int    `db:"period_limit"`
	Period      string `db:"period"`
	StartDate   string `db:"start_date"`
	CreatedAT   string `db:"created_at"`
	UpdatedAT   string `db:"updated_at"`
	Spends      []SpendModel
}

// CreateBudgetRepository creates a new instance of BudgetRepository.
func CreateBudgetRepository(db *sqlx.DB) *BudgetRepository {
	// Migrate the UserModel struct
	_, err := db.Exec(budgetSchema)
	if err != nil {
		budgetLogger.Fatal(`failed to create budget table`, `err`, err)
	}

	return &BudgetRepository{
		db: db,
	}
}

// CreateBudget creates a new budget in the BudgetRepository.
func (r *BudgetRepository) CreateBudget(budget *BudgetModel) error {
	_, err := r.db.NamedExec(`INSERT INTO budgets (user_id, name, current_limit, period_limit, period) VALUES (:user_id, :name, :current_limit, :period_limit, :period)`, budget)
	return err
}

// GetBudgetsByUserID retrieves the budgets associated with a specific user ID.
//
// Parameters:
// - userID: the ID of the user for whom to retrieve budgets.
//
// Returns:
// - []BudgetModel: a slice of BudgetModel representing the retrieved budgets.
func (r *BudgetRepository) GetBudgetsByUserID(userID uint) []BudgetModel {
	budgets := []BudgetModel{}

	// Get budgets
	err := r.db.Select(&budgets, `SELECT * FROM budgets WHERE budgets.user_id = $1`, userID)

	// If no budgets are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		budgetLogger.Error(`failed to get budgets`, `err`, err)
		return nil
	}

	// Get spends
	for i := range budgets {
		r.addSpends(&budgets[i])
	}

	return budgets
}

// UpdateBudget updates the budget in the BudgetRepository.
func (r *BudgetRepository) UpdateBudget(budget *BudgetModel) error {
	_, err := r.db.NamedExec(`
	UPDATE
		budgets 
	SET 
		name = :name, 
		current_limit = :current_limit, 
		period_limit = :period_limit, 
		period = :period 
	WHERE 
		id = :id AND
		user_id = :user_id`, budget)
	return err
}

// DeleteBudget deletes a budget from the repository.
func (r *BudgetRepository) DeleteBudget(budget *BudgetModel) error {
	_, err := r.db.NamedExec(`DELETE FROM budgets WHERE id = :id`, budget)
	return err
}

// addSpends adds spends to the budget.
func (r *BudgetRepository) addSpends(budget *BudgetModel) {
	spends := []SpendModel{}

	// Get spends
	err := r.db.Select(&spends, `SELECT * FROM spends WHERE budget_id = $1`, budget.ID)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return
	}

	// If an error occurs
	if err != nil {
		budgetLogger.Error(`failed to get spends`, `err`, err)
		return
	}

	budget.Spends = spends
}
