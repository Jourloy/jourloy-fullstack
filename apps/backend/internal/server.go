package internal

import (
	"flag"
	"os"
	"strconv"
	"time"

	"github.com/Jourloy/jourloy-fullstack/apps/backend/internal/database"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	Host   = flag.Int(`p`, 10001, `Server port`)
	logger = log.NewWithOptions(os.Stderr, log.Options{Prefix: `[server]`, Level: log.DebugLevel})
)

// Initialize the application.
func init() {
	if err := godotenv.Load(`.env`); err != nil {
		logger.Error(`Error loading .env file`, err)
	}
}

func StartServer() {
	// Create storage
	db := database.NewDatabase()

	// Create router
	r := gin.New()

	// Middlewares
	r.Use(gin.Recovery())
	r.Use(customLogger())

	// Groups
	authGroup := r.Group("/auth")

	// Starting
	log.Info(`Server started`)
	if err := r.Run(":" + strconv.Itoa(*Host)); err != nil {
		log.Fatal(err)
	}
}

func customLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		t := time.Now()
		c.Next()

		latency := time.Since(t)
		status := c.Writer.Status()
		method := c.Request.Method
		path := c.Request.URL.Path

		if method == `GET` {
			responseSize := c.Writer.Size()
			logger.Info(
				method,
				`status`,
				strconv.Itoa(status),
				`size`,
				responseSize,
				`path`,
				path,
				`latency`,
				latency,
			)
		} else {
			logger.Info(
				method,
				`status`,
				strconv.Itoa(status),
				`path`,
				path,
				`latency`,
				latency,
			)
		}
	}
}
