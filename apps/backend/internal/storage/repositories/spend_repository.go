package repositories

import (
	"database/sql"

	"gorm.io/gorm"
)

type SpendRepository struct {
	db *gorm.DB
}

type SpendModel struct {
	gorm.Model
	UserID      uint
	BudgetID    uint
	Cost        int
	Category    string
	Description string
	Date        sql.NullTime
	Repeat      sql.NullString
}

func CreateSpendRepository(db *gorm.DB) *SpendRepository {

	// Migrate the SpendModel struct
	db.AutoMigrate(&SpendModel{})

	return &SpendRepository{
		db: db,
	}
}

func (r *SpendRepository) CreateSpend(spend *SpendModel) error {
	return r.db.Create(spend).Error
}

func (r *SpendRepository) GetSpendByBudgetID(budgetID uint) []SpendModel {
	var spends []SpendModel
	r.db.Where("budget_id = ?", budgetID).Find(&spends)
	return spends
}

func (r *SpendRepository) GetSpendByUserID(userID uint) []SpendModel {
	var spends []SpendModel
	r.db.Where("user_id = ?", userID).Find(&spends)
	return spends
}

func (r *SpendRepository) GetSpendByUserIDAndBudgetID(userID uint, budgetID uint) []SpendModel {
	var spends []SpendModel
	r.db.Where("user_id = ? AND budget_id = ?", userID, budgetID).Find(&spends)
	return spends
}

func (r *SpendRepository) GetSpendByUserIDAndCategory(userID uint, category string) []SpendModel {
	var spends []SpendModel
	r.db.Where("user_id = ? AND category = ?", userID, category).Find(&spends)
	return spends
}

func (r *SpendRepository) GetSpendByUserIDAndDate(userID uint, date string) []SpendModel {
	var spends []SpendModel
	r.db.Where("user_id = ? AND date = ?", userID, date).Find(&spends)
	return spends
}

func (r *SpendRepository) UpdateSpend(spend *SpendModel) error {
	return r.db.Save(spend).Error
}

func (r *SpendRepository) DeleteSpend(spend *SpendModel) error {
	return r.db.Delete(spend).Error
}
