package database

import (
	"os"

	"github.com/Jourloy/jourloy-fullstack/apps/backend/internal/database/repository"
	"github.com/charmbracelet/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{Prefix: `[database]`, Level: log.DebugLevel})
)

type PostgresDatabase struct {
	UserRepository repository.UserRepository
}

func NewDatabase() *PostgresDatabase {
	databaseURL, exist := os.LookupEnv(`DATABASE_URL`)
	if !exist {
		logger.Fatal(`Error loading DATABASE_URL environment variable`)
	}

	deploy, exist := os.LookupEnv(`DEPLOY`)
	if !exist {
		deploy = `dev`
	}

	db, err := gorm.Open(postgres.Open(databaseURL+`_`+deploy), &gorm.Config{})
	if err != nil {
		logger.Fatal(err)
	}

	db.AutoMigrate(&repository.UserModel{})

	logger.Info(`Database connected`)

	return &PostgresDatabase{
		UserRepository: *repository.NewUserRepository(db),
	}
}
