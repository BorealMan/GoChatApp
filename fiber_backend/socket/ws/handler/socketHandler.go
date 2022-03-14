package handler

import (
	"app/ws"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

var clientId = 1 // For Incrementing In WS Test
func SocketHandler(h *ws.Hub) fiber.Handler {
	return websocket.New(func(c *websocket.Conn) {
		fmt.Println("Client Connected!\n\tID: ", clientId)

		client := ws.NewClient(clientId, "Ryan", c)
		clientId++

		h.Register <- client

		go client.WriteMessage()
		h.Broadcast <- &ws.Message{MessageId: 1, UserId: 1, Username: "Server", Message: "A User Joined.", CreatedAt: time.Now()}
		client.ReadMessage(h)
	})
}
