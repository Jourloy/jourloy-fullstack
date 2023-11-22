package repositories

import (
	"database/sql"
	"errors"
	"os"

	"github.com/charmbracelet/log"
	"github.com/jmoiron/sqlx"
)

type SpendRepository struct {
	db *sqlx.DB
}

// Logger for the Spends
var spendLogger = log.NewWithOptions(os.Stderr, log.Options{
	Prefix: `[database-spend]`,
	Level:  log.DebugLevel,
})

// Schema for the Spends
var spendSchema = `
CREATE TABLE IF NOT EXISTS spends (
	id SERIAL PRIMARY KEY,
	user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
	budget_id BIGINT REFERENCES budgets(id) ON DELETE CASCADE,
	cost INT NOT NULL,
	category VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	date DATE,
	repeat VARCHAR(255),
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

type SpendModel struct {
	ID          uint    `db:"id"`
	UserID      uint    `db:"user_id"`
	BudgetID    uint    `db:"budget_id"`
	Cost        int     `db:"cost"`
	Category    string  `db:"category"`
	Description *string `db:"description"`
	Date        *string `db:"date"`
	Repeat      *string `db:"repeat"`
	CreatedAT   string  `db:"created_at"`
	UpdatedAT   string  `db:"updated_at"`
}

// CreateSpendRepository creates a new instance of SpendRepository.
func CreateSpendRepository(db *sqlx.DB) *SpendRepository {
	// Migrate the UserModel struct
	_, err := db.Exec(spendSchema)
	if err != nil {
		spendLogger.Fatal(`Failed to migrate SpendModel struct`, `err`, err)
	}

	return &SpendRepository{
		db: db,
	}
}

// CreateSpend creates a spend in the SpendRepository.
func (r *SpendRepository) CreateSpend(spend *SpendModel) error {
	_, err := r.db.NamedExec(`INSERT INTO spends (user_id, budget_id, cost, category, description, date, repeat) VALUES (:user_id, :budget_id, :cost, :category, :description, :date, :repeat)`, spend)
	return err
}

// GetSpendByBudgetID retrieves a list of spend models by budget ID.
//
// Parameters:
// - budgetID: the ID of the budget to retrieve spend models for.
//
// Returns:
// - []SpendModel: a list of spend models matching the given budget ID.
func (r *SpendRepository) GetSpendByBudgetID(budgetID uint) []SpendModel {
	spends := []SpendModel{}

	// Get spends
	err := r.db.Select(&spends, `SELECT * FROM spends WHERE budget_id = $1`, budgetID)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		spendLogger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

// GetSpendByUserID retrieves spends for a given user ID.
//
// Parameters:
// - userID: the ID of the user to retrieve spends for.
//
// Returns:
// - []SpendModel: a slice of SpendModel representing the retrieved spends.
func (r *SpendRepository) GetSpendByUserID(userID uint) []SpendModel {
	spends := []SpendModel{}

	// Get spend
	err := r.db.Select(&spends, `SELECT * FROM spends WHERE user_id = $1`, userID)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		spendLogger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

// GetSpendByUserIDAndBudgetID retrieves spends for a given user ID and budget ID.
//
// Parameters:
// - userID: the ID of the user to retrieve spends for.
// - budgetID: the ID of the budget to retrieve spends for.
//
// Returns:
// - []SpendModel: a slice of SpendModel representing the retrieved spends.
func (r *SpendRepository) GetSpendByUserIDAndBudgetID(userID uint, budgetID uint) *SpendModel {
	spend := SpendModel{}

	// Get spend
	err := r.db.Get(&spend, `SELECT * FROM spends WHERE user_id = $1 AND budget_id = $2`, userID, budgetID)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		spendLogger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return &spend
}

func (r *SpendRepository) GetSpendByUserIDAndSpendID(userID uint, id uint) *SpendModel {
	spend := SpendModel{}

	// Get spend
	err := r.db.Get(&spend, `SELECT * FROM spends WHERE user_id = $1 AND id = $2`, userID, id)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		spendLogger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return &spend
}

// GetSpendByUserIDAndCategory retrieves spends for a given user ID and category.
//
// Parameters:
// - userID: the ID of the user to retrieve spends for.
// - category: the category to retrieve spends for.
//
// Returns:
// - []SpendModel: a slice of SpendModel representing the retrieved spends.
func (r *SpendRepository) GetSpendByUserIDAndCategory(userID uint, category string) []SpendModel {
	spends := []SpendModel{}

	// Get spend
	err := r.db.Select(&spends, `SELECT * FROM spends WHERE user_id = $1 AND category = $2`, userID, category)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		spendLogger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

// GetSpendByUserIDAndDate retrieves spends for a given user ID and date.
//
// Parameters:
// - userID: the ID of the user to retrieve spends for.
// - date: the date to retrieve spends for.
//
// Returns:
// - []SpendModel: a slice of SpendModel representing the retrieved spends.
func (r *SpendRepository) GetSpendByUserIDAndDate(userID uint, date string) []SpendModel {
	spends := []SpendModel{}

	// Get spend
	err := r.db.Select(&spends, `SELECT * FROM spends WHERE user_id = $1 AND date = $2`, userID, date)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		spendLogger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

// UpdateSpend updates a spend in the SpendRepository.
func (r *SpendRepository) UpdateSpend(spend *SpendModel) error {
	_, err := r.db.NamedExec(`UPDATE spends SET cost = :cost, category = :category, description = :description, date = :date, repeat = :repeat WHERE id = :id`, spend)
	return err
}

// DeleteSpend deletes a spend from the SpendRepository.
func (r *SpendRepository) DeleteSpend(spend *SpendModel) error {
	_, err := r.db.NamedExec(`DELETE FROM spends WHERE id = :id AND user_id = :user_id`, spend)
	return err
}
