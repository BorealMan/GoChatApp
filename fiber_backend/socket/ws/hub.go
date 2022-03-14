package ws

import (
	"fmt"
	"time"
)

type Hub struct {
	Broadcast chan *Message
	Register  chan *Client
	Drop      chan *Client
	Clients   map[int]*Client
}

func (h *Hub) Run() {
	for {
		select {
		// Register New Client Connection
		case client := <-h.Register:
			fmt.Println("Registering Client: ", client)
			h.Clients[client.ClientId] = client
		// Removing Client Connection
		case client := <-h.Drop:
			fmt.Println("Dropping Client: ", client)
			delete(h.Clients, client.ClientId)
			close(client.Messages)
			h.Broadcast <- &Message{MessageId: 1, UserId: 1, Username: "Server", Message: "A User Disconnected.", CreatedAt: time.Now()}
			// Broadcast Messages
		case message := <-h.Broadcast:
			fmt.Println("Broadcasting: ", message)
			for _, client := range h.Clients {
				client.Messages <- message
			}
		}
	}
}

func NewHub() *Hub {
	return &Hub{
		Broadcast: make(chan *Message, 5),
		Register:  make(chan *Client),
		Drop:      make(chan *Client),
		Clients:   make(map[int]*Client),
	}
}
