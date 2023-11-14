package internal

import (
	"flag"
	"os"
	"strconv"
	"time"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/handlers"
	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal/storage"
	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
)

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[server]`,
		Level:  log.DebugLevel,
	})

	Port = flag.Int(`p`, 10001, `Port of the server`)
)

// parseENV parses the environment variables.
func parseENV() {
	if env, exist := os.LookupEnv(`PORT`); exist {
		if p, err := strconv.Atoi(env); err == nil {
			Port = &p
		}
	}
}

// StartServer initializes the server and starts listening for incoming requests.
func StartServer() {
	// Initialization
	flag.Parse()
	parseENV()

	// Create router
	r := gin.New()

	// Middlewares
	r.Use(gin.Recovery())
	r.Use(defaultMiddleware())
	r.Use(loggerMiddleware())

	// Groups
	app := r.Group(`/`)
	auth := r.Group(`/auth`)

	// Storage
	s := storage.CreateStorage()

	// Handlers
	handlers.RegisterAppHandler(app)
	handlers.RegisterAuthHandler(auth, s)

	// Start server
	logger.Info(`Server started on port ` + strconv.Itoa(*Port))
	if err := r.Run("0.0.0.0:" + strconv.Itoa(*Port)); err != nil {
		logger.Fatal(err)
	}
}

// defaultMiddleware is a middleware function that parses the request body.
func defaultMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.ParseForm()

		c.Next()
	}
}

// loggerMiddleware is a middleware function that logs information about incoming requests.
func loggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		t := time.Now()

		c.Next()

		latency := time.Since(t)
		status := c.Writer.Status()
		method := c.Request.Method
		path := c.Request.URL.Path

		logger.Info(
			`Response`,
			`method`, method,
			`path`, path,
			`status`, status,
			`latency`, latency,
		)
	}
}
