const express = require('express')
const cors = require('cors')
app = express()
const expressWS = require('express-ws')(app)
app.use(cors())


app.get('/', (req, res) => {
    res.send("I am working")
})

app.ws('/ws', (ws, req) => {
    let welcomeMessage = {message_id:1, user_id:1, username:"server", message:"A user joined.", created_at:new Date()}
    let data = JSON.stringify(welcomeMessage)
    ws.send(data)
    ws.on('connection', (client) => {
        console.log("New Client", client)
    })
    ws.on('message', msg => {
        console.log("From Client: " + msg)
        let message = {message_id:1, user_id:1, username:"server", message:msg, created_at:new Date()}
        let data = JSON.stringify(message)
        ws.send(data)
    })
})


const port = 4142
app.listen(port, () => {
    console.log("Listening at http://localhost:" + port)
})


