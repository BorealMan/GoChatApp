package ws

import (
	"fmt"
	"time"

	"github.com/gofiber/websocket/v2"
)

type Client struct {
	Conn     *websocket.Conn
	ClientId int    `json:"client_id"`
	Username string `json:"username"`
	Messages chan *Message
}

// From WebSocket
func (c *Client) ReadMessage(h *Hub) {
	defer func() {
		h.Drop <- c
		c.Conn.Close()
	}()
	// Reads any incoming message
	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			break
		}

		fmt.Printf("Recieved Message: %s\n", m)

		msg := NewMessage(1, 1, "Ryan", string(m), time.Now())
		h.Broadcast <- msg
	}
}

// To Socket
func (c *Client) WriteMessage() {
	defer func() {
		fmt.Println("Closing Connection")
	}()
	// Runs in Go Routine, Listens to Messages Channel For Broadcasts
	for {
		select {
		case message, ok := <-c.Messages:
			if !ok {
				return
			}
			fmt.Println("Client ", c.ClientId, " Write: ", message)
			c.Conn.WriteJSON(message)
			time.Sleep(time.Millisecond * 100)
		}

	}
}

func NewClient(client_id int, username string, c *websocket.Conn) *Client {
	return &Client{
		Conn:     c,
		ClientId: client_id,
		Username: username,
		Messages: make(chan *Message, 10),
	}
}
