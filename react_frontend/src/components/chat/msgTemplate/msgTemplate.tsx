import React from 'react'
import './msgTemplate.css'

function MessageTemplate(props:any) {
  return (
    <div className='chat-message-template'>
        <div className='chat-message-template-header'>
            <div className='chat-message-template-username'>{props.username}</div>
            <div>{props.createdAt}</div>
        </div>
        <div className='chat-message-template-body'>
            <div>{props.message}</div>
        </div>
    </div>
  )
}

export default MessageTemplate