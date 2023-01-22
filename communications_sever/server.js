const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')
const aws = require('aws-sdk')
require("dotenv").config()
const Bucket = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})


const generateSecureURL = async () => {
    const imgName = `${Math.floor((Math.random() * 900)+100)}-${Math.floor((Math.random() * 8)+1)}-${Math.floor((Math.random() * 90)+10)}`

    const params = ({
        Bucket,
        Key: imgName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject',params)
    return uploadURL
}


app.use(cors({
    origin: ['http://localhost:3000'],
}))

app.get('/s3Url', async (reg,res) => {
    const url = await generateSecureURL()
    res.send({url})
})

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
    socket.on('join-room', (room,user) => {
        socket.join(room)
        socket.to(room).emit("msg_from_server", {from:'',message:`${user.username} Just Joined`})
    })
})