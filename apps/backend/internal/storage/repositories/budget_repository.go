package repositories

import (
	"time"

	"gorm.io/gorm"
)

type BudgetRepository struct {
	db *gorm.DB
}

type BudgetModel struct {
	gorm.Model
	UserID      uint
	Name        string
	Limit       int
	PeriodLimit int
	Period      string
	StartDate   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}

func CreateBudgetRepository(db *gorm.DB) *BudgetRepository {

	// Migrate the BudgetModel struct
	db.AutoMigrate(&BudgetModel{})

	return &BudgetRepository{
		db: db,
	}
}

func (r *BudgetRepository) CreateBudget(budget *BudgetModel) error {
	return r.db.Create(budget).Error
}

func (r *BudgetRepository) GetBudgetsByUserID(userID uint) *[]BudgetModel {
	var budget []BudgetModel
	r.db.Where(&budget, "user_id = ?", userID)
	return &budget
}

func (r *BudgetRepository) GetBudgetByName(name string) *BudgetModel {
	var budget BudgetModel
	r.db.First(&budget, "name = ?", name)
	if budget.ID == 0 {
		return nil
	}
	return &budget
}

func (r *BudgetRepository) GetBudgetByID(id uint) *BudgetModel {
	var budget BudgetModel
	r.db.First(&budget, "id = ?", id)
	if budget.ID == 0 {
		return nil
	}
	return &budget
}

func (r *BudgetRepository) UpdateBudget(budget *BudgetModel) error {
	return r.db.Save(budget).Error
}

func (r *BudgetRepository) DeleteBudget(budget *BudgetModel) error {
	return r.db.Delete(budget).Error
}
