import React, {useState} from 'react'
import './msgInput.css'

function MessageInput(props:any) {

    const [newMsg, setNewMsg] = useState("")

    function handleNewMsg(e:any) {
        e.preventDefault()
        console.log("called Handler Function")
        if (newMsg === "" || !props.ws?.OPEN) return
        console.log("Message: " + newMsg)
        if (props.ws !== null && props.ws.OPEN) {
            console.log("Sending Message To Socket: " + newMsg)
            props.ws.send(newMsg)
        }
        setNewMsg("")
    }

    function localClear() {
        props.clearChat()
        setNewMsg("")
    }

    function isEnter(e:any) {
        if (e.keyCode === 13) {
            handleNewMsg(e)
        }
    }

    return (
    <form className='chat-input-form' name='chat-input-form' onKeyDown={isEnter} onSubmit={e => handleNewMsg(e)}>
        <textarea
        id='chat-input' 
        placeholder='Enter Message...'
        value={newMsg}
        onChange={(e:any) => setNewMsg(e.target.value)}
        autoSave='false'
        autoComplete='false'
        />
        <button className='chat-input-button' type='submit'>Submit</button>
        <button className='chat-input-button' type='button' onClick={props.toggleSocket}>Connect</button>
        <button className='chat-input-button' type='button' onClick={localClear}>Clear</button>
    </form>
    )
}

export default MessageInput