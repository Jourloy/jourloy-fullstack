package storage

import (
	"os"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage/repositories"
	"github.com/charmbracelet/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	lg "gorm.io/gorm/logger"
)

type Storage struct {
	UserRepository *repositories.UserRepository
}

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[database]`,
		Level:  log.DebugLevel,
	})

	DatabaseDNS string
)

// parseENV parses the environment variables.
func parseENV() {
	if env, exist := os.LookupEnv(`DATABASE_DSN`); exist {
		DatabaseDNS = env
	}
}

// CreateStorage initializes and returns a new instance of the Storage struct.
func CreateStorage() *Storage {
	// Initialization
	parseENV()

	// Create connection
	db, err := gorm.Open(postgres.Open(DatabaseDNS), &gorm.Config{
		Logger: lg.Default.LogMode(lg.Silent),
	})
	if err != nil {
		logger.Fatal(`Failed to connect to database`, `err`, err)
	}

	// Auto migrate
	db.AutoMigrate(&repositories.UserModel{})

	// Create repositories
	userRepository := repositories.CreateUserRepository(db)

	return &Storage{
		UserRepository: userRepository,
	}
}
