package ws

import "time"

type Message struct {
	MessageId int       `json:"message_id"`
	UserId    int       `json:"user_id"`
	Username  string    `json:"username"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
}

func NewMessage(messageId int, userId int, username string, message string, createdAt time.Time) *Message {
	return &Message{
		MessageId: messageId,
		UserId:    userId,
		Username:  username,
		Message:   message,
		CreatedAt: createdAt,
	}
}
