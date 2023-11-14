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

// CreateUserRepository creates a new instance of UserRepository.
func CreateUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

// CreateUser creates a new user in the UserRepository.
//
// Parameters:
// - user: a pointer to the UserModel struct representing the user to be created.
//
// Return type:
// - error: an error if the user creation fails.
func (r *UserRepository) CreateUser(user *UserModel) error {
	hash := hashString(user.Password)
	return r.db.Create(&UserModel{
		Username: user.Username,
		Password: hash,
		Role:     user.Role,
	}).Error
}

// GetUserByUsername returns the user with the given username.
//
// Parameters:
// - username: a string representing the username of the user.
//
// Return type:
// - *UserModel: a pointer to the UserModel struct representing the user. It returns nil if no user is found.
func (r *UserRepository) GetUserByUsername(username string) *UserModel {
	var user UserModel
	r.db.First(&user, "username = ?", username)
	if user.ID == 0 {
		return nil
	}
	return &user
}

// UpdateUser updates a user in the UserRepository.
//
// Parameters:
// - user: a pointer to the UserModel struct representing the user to be updated.
//
// Return type:
// - error: an error if the user update fails.
func (r *UserRepository) UpdateUser(user *UserModel) error {
	return r.db.Save(user).Error
}

// hashString generates a hash of the input string using bcrypt algorithm.
//
// Parameters:
// - str: the input string to be hashed.
//
// Return:
// - string: the hashed string.
func hashString(str string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
	return string(bytes)
}
