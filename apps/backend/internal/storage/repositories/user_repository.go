package repositories

import (
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

type UserModel struct {
	gorm.Model
	Username      string
	Password      string
	Role          string
	RefreshTokens pq.StringArray `gorm:"type:text[]"`
}

func CreateUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) CreateUser(user *UserModel) error {
	hash := hashString(user.Password)
	return r.db.Create(&UserModel{
		Username: user.Username,
		Password: hash,
		Role:     user.Role,
	}).Error
}

func (r *UserRepository) GetUserByUsername(username string) *UserModel {
	var user UserModel
	r.db.First(&user, "username = ?", username)
	if user.ID == 0 {
		return nil
	}
	return &user
}

func (r *UserRepository) UpdateUser(user *UserModel) error {
	return r.db.Save(user).Error
}

func hashString(str string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
	return string(bytes)
}
