import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './chat.css'
import MessageWidow from './msgWindow/messageWidow'
import MessageInput from './msgInput/msgInput'
import { logout } from '../../redux/user'
import { postMessage, clearMessages } from '../../redux/messages'


let ws: WebSocket | null = null
const socketAddress:string = 'ws://localhost:4142/ws'
// For now - one channel 
function Chat() {
  // Redux
    const user = useSelector((state:any) => state.user)
    const msgs = useSelector((state:any) => state.messages)
    const dispatch = useDispatch()

    function initSocket() {
        ws = new WebSocket(socketAddress)
        ws.onopen = () => {
          console.log("Go WebSocket Connected")
        }
        ws.onmessage = (data) => {
          console.log(`From Server: ${data.data}`)
          let msg = JSON.parse(data.data)
          console.log("JSON: ", msg.message)
          dispatch(postMessage(msg))
        }
        ws.onclose = () => {
          console.log("Go WebSocket Terminated")
        }
      }
      
    // Toggle Connection is Locked For 2 seconds
    const [socketLocked, setSocketLocked] = useState(false)
    const [queuedLock, setQueuedLock] = useState(false)
    async function toggleSocket() {
        if (socketLocked) {
          if (queuedLock) {
            return
          } else {
            setQueuedLock(true)
            await new Promise(r => setTimeout(r, 600))
            setQueuedLock(false)
          }
        }
        setSocketLocked(true)
        if (ws !== null) {
          ws.close()
          ws = null
        } else {
          initSocket()
        }
        // Locks Socket For 2 Seconds
        await new Promise(r => setTimeout(r, 1000));
        setSocketLocked(false)
      }



    function Logout() {
        ws?.close()
        clearChat()
        dispatch(logout())
    }

    function clearChat() {
      dispatch(clearMessages(null))
    }

    useEffect(() => {
      console.log("Refreshing Chat")
    })

    return (
    <div className='chat'>
        <nav className='chat-nav'>
            <p>Welcome!</p>
            <p className='logout-btn' onClick={Logout}>Logout</p>
        </nav>
        <section className='chat-main-container'>
          <MessageWidow messages={msgs.messages}/>
          <MessageInput ws={ws} toggleSocket={toggleSocket} clearChat={clearChat}/>
        </section>
    </div>
    )
}

export default Chat