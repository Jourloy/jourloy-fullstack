package main

import (
	"os"
	"os/exec"

	"github.com/Jourloy/jourloy-fullstack/tree/main/apps/backend/internal"
	"github.com/charmbracelet/log"
	"github.com/joho/godotenv"
)

var (
	logger = log.NewWithOptions(os.Stderr, log.Options{
		Prefix: `[cmd]`,
	})
)

func main() {
	// Clear terminal
	cmd := exec.Command(`cmd`, `/c`, `cls`)
	cmd.Stdout = os.Stdout
	cmd.Run()

	// Load .env
	if err := godotenv.Load(`.env`); err != nil {
		logger.Fatal(`Error loading .env file`)
	}

	// Start server
	internal.StartServer()
}
