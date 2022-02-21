const express = require('express')
const lessonsRouter = require('../routes/lessons-routes')
const messagesRouter = require('../routes/messages-router')

const server = express()


server.use(express.json())
server.use('/api/messages', messagesRouter)
server.use('/api/lessons', lessonsRouter)


server.get('/',(req,res)=>{
    res.status(200).json({message: 'Congrats. Your app has been deployed to heroku!'})
})

module.exports = server