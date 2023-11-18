package repositories

import (
	"database/sql"
	"errors"

	"github.com/jmoiron/sqlx"
)

type SpendRepository struct {
	db *sqlx.DB
}

var spendSchema = `
CREATE TABLE IF NOT EXISTS spends (
	id SERIAL PRIMARY KEY,
	user_id BIGINT NOT NULL,
	budget_id BIGINT NOT NULL,
	cost INT NOT NULL,
	category VARCHAR(255) NOT NULL,
	description VARCHAR(255),
	date DATE,
	repeat VARCHAR(255),
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

type SpendModel struct {
	UserID      string `db:"user_id"`
	BudgetID    string `db:"budget_id"`
	Cost        int    `db:"cost"`
	Category    string `db:"category"`
	Description string `db:"description"`
	Date        string `db:"date"`
	Repeat      string `db:"repeat"`
	CreatedAT   string `db:"created_at"`
	UpdatedAT   string `db:"updated_at"`
}

func CreateSpendRepository(db *sqlx.DB) *SpendRepository {

	// Migrate the UserModel struct
	_, err := db.Exec(spendSchema)
	if err != nil {
		logger.Fatal(`Failed to migrate SpendModel struct`, `err`, err)
	}

	return &SpendRepository{
		db: db,
	}
}

func (r *SpendRepository) CreateSpend(spend *SpendModel) error {
	_, err := r.db.NamedExec(`INSERT INTO spends (user_id, budget_id, cost, category, description, date, repeat) VALUES (:user_id, :budget_id, :cost, :category, :description, :date, :repeat)`, spend)
	return err
}

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
		logger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

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
		logger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

func (r *SpendRepository) GetSpendByUserIDAndBudgetID(userID uint, budgetID uint) []SpendModel {
	spends := []SpendModel{}

	// Get spend
	err := r.db.Select(&spends, `SELECT * FROM spends WHERE user_id = $1 AND budget_id = $2`, userID, budgetID)

	// If no spends are found
	if errors.Is(err, sql.ErrNoRows) {
		return nil
	}

	// If an error occurs
	if err != nil {
		logger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

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
		logger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

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
		logger.Error(`failed to get spends`, `err`, err)
		return nil
	}

	return spends
}

func (r *SpendRepository) UpdateSpend(spend *SpendModel) error {
	_, err := r.db.NamedExec(`UPDATE spends SET cost = :cost, category = :category, description = :description, date = :date, repeat = :repeat WHERE id = :id`, spend)
	return err
}

func (r *SpendRepository) DeleteSpend(spend *SpendModel) error {
	_, err := r.db.NamedExec(`DELETE FROM spends WHERE id = :id`, spend)
	return err
}
