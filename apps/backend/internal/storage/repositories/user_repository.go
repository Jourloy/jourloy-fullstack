package repositories

import (
	"database/sql"
	"errors"
	"os"

	"github.com/charmbracelet/log"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// Logger for user
var userLogger = log.NewWithOptions(os.Stderr, log.Options{
	Prefix: `[database-user]`,
	Level:  log.DebugLevel,
})

type UserRepository struct {
	db *sqlx.DB
}

// Schema for user
var userSchema = `
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(255) NOT NULL,
	refresh_tokens VARCHAR[],
	budget VARCHAR[],
	CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

type UserModel struct {
	ID            string         `db:"id"`
	Username      string         `db:"username"`
	Password      string         `db:"password"`
	Role          string         `db:"role"`
	RefreshTokens pq.StringArray `db:"refresh_tokens"`
	Budget        *[]string      `db:"budget"`
	CreatedAT     string         `db:"created_at"`
	UpdatedAT     string         `db:"updated_at"`
}

// CreateUserRepository creates a new instance of UserRepository.
func CreateUserRepository(db *sqlx.DB) *UserRepository {

	// Migrate the UserModel struct
	_, err := db.Exec(userSchema)
	if err != nil {
		userLogger.Fatal(`failed to migrate user schema`, `err`, err)
	}

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
	// Check exist
	u, err := r.GetUserByUsername(user.Username)
	if u != nil {
		return errors.New(`user already exists`)
	}
	if err != nil {
		return err
	}

	// Hash password
	hash := hashString(user.Password)
	user.Password = hash

	// Create
	_, err = r.db.NamedExec(`INSERT INTO users (username, password, role) VALUES (:username, :password, :role)`, user)
	return err
}

// GetUserByUsername returns the user with the given username.
//
// Parameters:
// - username: a string representing the username of the user.
//
// Return type:
// - *UserModel: a pointer to the UserModel struct representing the user. It returns nil if no user is found.
func (r *UserRepository) GetUserByUsername(username string) (*UserModel, error) {
	user := UserModel{}

	// Get user
	err := r.db.Get(&user, `SELECT * FROM users WHERE username = $1`, username)

	// If no user is found
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}

	// If an error occurs
	if err != nil {
		userLogger.Error(`failed to get user`, `err`, err)
		return nil, err
	}

	return &user, nil
}

// UpdateUser updates a user in the UserRepository.
//
// Parameters:
// - user: a pointer to the UserModel struct representing the user to be updated.
//
// Return type:
// - error: an error if the user update fails.
func (r *UserRepository) UpdateUser(user *UserModel) error {
	_, err := r.db.NamedExec(`UPDATE users SET username = :username, password = :password, role = :role, refresh_tokens = :refresh_tokens WHERE id = :id`, user)
	return err
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
