const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')

app.use(cors({
    origin: ['http://localhost:3000'],
}))

const server = app.listen(5000, () => console.log('Chat Server is up...'))

const io = socket(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ['*'],
        credentials: true
    }
})

io.on('connection', socket => {
    console.log('socket id', socket.id);
    socket.on("msg_from_client", (data, room) => {
        room==="" ? 
            socket.broadcast.emit("msg_from_server", data)
            : socket.to(room).emit("msg_from_server", data)
    });
    socket.on('join-room', room => socket.join(room))
})