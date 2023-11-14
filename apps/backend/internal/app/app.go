package app

import (
	"time"

	"github.com/gin-gonic/gin"
)

type appService struct{}

var startTime time.Time

// init initializes the program by setting the start time.
func init() {
	startTime = time.Now()
}

// CreateAppService creates a new instance of the appService struct.
func CreateAppService() *appService {
	return &appService{}
}

// LiveCheck returns the status of the application.
func (s *appService) LiveCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		`status`: `OK`,
		`uptime`: time.Since(startTime) / time.Second,
	})
}
