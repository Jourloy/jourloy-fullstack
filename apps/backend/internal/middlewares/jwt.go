package middlewares

import (
	"os"

	"github.com/charmbracelet/log"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[auth]`,
		Level:  log.DebugLevel,
	})

	Secret string
)

// parseENV parses the environment variables.
func parseENV() {
	env, exist := os.LookupEnv(`SECRET`)
	if !exist {
		logger.Fatal(`Error loading SECRET from .env file`)
	}
	Secret = env
}

func JwtMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get cookies
		parseENV()

		// Get access token
		a, err := c.Cookie(`access_token`)
		if err != nil {
			c.Next()
		}

		// Get refresh token
		r, err := c.Cookie(`refresh_token`)
		if err != nil {
			c.Next()
		}

		// Check tokens
		if a == `` || r == `` {
			c.Next()
		}

		// Verify and decode
		claims := jwt.MapClaims{}
		if _, err := jwt.ParseWithClaims(a, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(Secret), nil
		}); err != nil {
			c.Next()
		}

		// Check username and role
		var username string
		var role string

		for key, val := range claims {
			if key == `username` {
				username = val.(string)
			}
			if key == `role` {
				role = val.(string)
			}
		}

		if username == `` || role == `` {
			c.Next()
		}

		c.Set(`username`, username)
		c.Set(`role`, role)

		c.Next()
	}
}
