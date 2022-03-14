import React, { useEffect, useRef } from 'react'
import './messageWindow.css'
import MessageTemplate from '../msgTemplate/msgTemplate'

function MessageWidow(props:any) {

  function formatDate(date:Date) {
    let d = new Date(date)
    return d.toLocaleTimeString()
  }

  const bottom = useRef<null | HTMLDivElement>(null)

  function autoScrollBottom() {
    bottom.current?.scrollIntoView()
  }

  useEffect(() => {
    autoScrollBottom()
  })

  return (
        <div className='chat-message-window'>
        {
            props.messages.map((msg:any, i:number) => {
                if (i > 0)
                return <MessageTemplate username={msg.username} message={msg.message} createdAt={formatDate(msg.created_at)} key={i}/>
            })
        }
        <div className='chat-message-window-bottom' ref={bottom}></div>
        </div>
  )
}

export default MessageWidow