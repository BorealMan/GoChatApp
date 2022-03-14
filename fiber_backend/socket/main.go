package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"app/ws"
	"app/ws/handler"
)

func testHandler(c *fiber.Ctx) error {
	return c.SendStatus(200)
}

func middlewareExample(c *fiber.Ctx) error {
	fmt.Println("Authenticating the user before creating a socket connection")
	return c.Next()
}

func main() {

	app := fiber.New()
	app.Use(logger.New())

	hub := ws.NewHub()

	go hub.Run()

	app.Get("/", middlewareExample, testHandler)
	app.Get("/ws", handler.SocketHandler(hub))

	fmt.Println("\nRunning At http://localhost:4142")
	app.Listen(":4142")
}
