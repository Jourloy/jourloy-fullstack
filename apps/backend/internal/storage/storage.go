package storage

import (
	"os"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage/repositories"
	"github.com/charmbracelet/log"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Storage struct {
	User   *repositories.UserRepository
	Budget *repositories.BudgetRepository
	Spend  *repositories.SpendRepository
}

var (
	// Logger for the storage package
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
	db, err := sqlx.Connect(`postgres`, DatabaseDNS)
	if err != nil {
		logger.Fatal(`Failed to connect to database`, `err`, err)
	}

	// Create repositories
	userRepository := repositories.CreateUserRepository(db)
	budgetRepository := repositories.CreateBudgetRepository(db)
	spendRepository := repositories.CreateSpendRepository(db)

	return &Storage{
		User:   userRepository,
		Budget: budgetRepository,
		Spend:  spendRepository,
	}
}
