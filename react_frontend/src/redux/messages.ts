import { createSlice } from '@reduxjs/toolkit'

export class Message {
    messageId: number | null
    userId:number| null
    username:string| null
    message:string| null
    createdAt:Date| null
    updatedAt:Date| null
    constructor(messageId:number, userId:number, username:string, message:string, createdAt:Date, updatedAt:Date | null=null) {
        this.messageId = messageId
        this.userId = userId
        this.username = username
        this.message = message
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        console.log("created a new message!")
        this.Print()
    }

    Print() {
        console.log(`MessageId: ${this.messageId}\nUserId: ${this.userId}\nMessage: ${this.message}`)
    }
}

const defaultMessage = {message_id: 1, user_id: 1, username: "admin", message: "Hello!", dateCreated:new Date()}

export const messageSlice = createSlice({
    name:'test',
    initialState: {
        count: 0,
        messages: [defaultMessage]
    }, reducers: {
        postMessage: (state, action) => {
            console.log(action.payload)
            state.count++
            state.messages.push(action.payload)
        },
        updateMessage: (state, action) => {
            console.log("Hello")
        },
        deleteMessage: (state, action) => {

        },
        clearMessages: (state, action) => {
            state.messages = [defaultMessage]
        }
    }
})

export const {postMessage, clearMessages} = messageSlice.actions

export default messageSlice.reducer