package repositories

import (
	"database/sql"
	"errors"

	"github.com/jmoiron/sqlx"
)

type BudgetRepository struct {
	db *sqlx.DB
}

var budgetSchema = `
CREATE TABLE IF NOT EXISTS budgets (
	id SERIAL PRIMARY KEY,
	user_id BIGINT,
	name VARCHAR(255),
	cureent_limit INT,
	period_limit INT,
	period VARCHAR(255),
	start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

type BudgetModel struct {
	ID          uint   `db:"id"`
	UserID      string `db:"user_id"`
	Name        string `db:"name"`
	Limit       int    `db:"cureent_limit"`
	PeriodLimit int    `db:"period_limit"`
	Period      string `db:"period"`
	StartDate   string `db:"start_date"`
	CreatedAT   string `db:"created_at"`
	UpdatedAT   string `db:"updated_at"`
}

func CreateBudgetRepository(db *sqlx.DB) *BudgetRepository {

	// Migrate the UserModel struct
	_, err := db.Exec(budgetSchema)
	if err != nil {
		logger.Fatal(`failed to create budget table`, `err`, err)
	}

	return &BudgetRepository{
		db: db,
	}
}

func (r *BudgetRepository) CreateBudget(budget *BudgetModel) error {
	_, err := r.db.NamedExec(`INSERT INTO budgets (user_id, name, cureent_limit, period_limit, period) VALUES (:user_id, :name, :cureent_limit, :period_limit, :period)`, budget)
	return err
}

func (r *BudgetRepository) GetBudgetsByUserID(userID string) []BudgetModel {
	budgets := []BudgetModel{}

	// Get budgets
	err := r.db.Select(&budgets, `SELECT * FROM budgets WHERE user_id = $1`, userID)

	// If no budgets are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		logger.Error(`failed to get budgets`, `err`, err)
		return nil
	}

	return budgets
}

func (r *BudgetRepository) GetBudgetByName(name string) *BudgetModel {
	budget := BudgetModel{}

	// Get budget
	err := r.db.Get(&budget, `SELECT * FROM budgets WHERE name = $1`, name)

	// If no budgets are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		logger.Error(`failed to get budget`, `err`, err)
		return nil
	}

	return &budget
}

func (r *BudgetRepository) GetBudgetByID(id uint) *BudgetModel {
	budget := BudgetModel{}

	// Get budget
	err := r.db.Get(&budget, `SELECT * FROM budgets WHERE id = $1`, id)

	// If no budgets are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		logger.Error(`failed to get budget`, `err`, err)
		return nil
	}
	return &budget
}

func (r *BudgetRepository) UpdateBudget(budget *BudgetModel) error {
	_, err := r.db.NamedExec(`UPDATE budgets SET name = :name, limit = :limit, period_limit = :period_limit, period = :period WHERE id = :id`, budget)
	return err
}

func (r *BudgetRepository) DeleteBudget(budget *BudgetModel) error {
	_, err := r.db.NamedExec(`DELETE FROM budgets WHERE id = :id`, budget)
	return err
}
