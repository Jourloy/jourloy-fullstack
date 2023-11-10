package repository

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserRepository struct {
	database *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		database: db,
	}
}

type UserModel struct {
	gorm.Model
	Username     string
	Avatar       string
	Role         string
	Password     *string
	GoogleID     *string
	DiscorID     *string
	RefreshToken []string
}

func (p *UserRepository) CreateUser(username string, role string, password *string, googleID *string, discordID *string) (UserModel, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)
	if err == nil {
		*password = string(hash)
	}

	user := UserModel{
		Username:     username,
		Avatar:       `https://avatars.dicebear.com/api/identicon/` + username + `.svg`,
		Role:         role,
		Password:     password,
		GoogleID:     googleID,
		DiscorID:     discordID,
		RefreshToken: []string{},
	}
	return user, p.database.Create(&user).Error
}

func (p *UserRepository) UpdateUser(user UserModel) error {
	return p.database.Save(&user).Error
}

func (p *UserRepository) GetUserByUsername(username string) (UserModel, error) {
	var user UserModel
	return user, p.database.Where("username = ?", username).First(&user).Error
}

func (p *UserRepository) GetUserByGoogleID(googleID string) (UserModel, error) {
	var user UserModel
	return user, p.database.Where("google_id = ?", googleID).First(&user).Error
}

func (p *UserRepository) GetAllUsers(page *int, userQuerry *UserModel) ([]UserModel, error) {
	var users []UserModel
	return users, p.database.Where(userQuerry).Limit(20).Offset((*page - 1) * 10).Find(&users).Error
}

func (p *UserRepository) RemoveUserByUsername(username string) error {
	return p.database.Where("username = ?", username).Delete(&UserModel{}).Error
}

func (p *UserRepository) RemoveUserByGoogleID(googleID string) error {
	return p.database.Where("google_id = ?", googleID).Delete(&UserModel{}).Error
}
