package app

import (
	"time"

	"github.com/gin-gonic/gin"
)

type appService struct{}

var startTime time.Time

func init() {
	startTime = time.Now()
}

func CreateAppService() *appService {
	return &appService{}
}

func (s *appService) LiveCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		`status`: `OK`,
		`uptime`: time.Since(startTime) / time.Second,
	})
}
