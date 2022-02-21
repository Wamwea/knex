const express = require('express')
const server = express()
const lessonsRouter = require('../routes/lessons-routes')
const messagesRouter = require('../routes/messages-router')


server.use(express.json())
server.use(lessonsRouter)
server.use('/api/messages', messagesRouter)
server.use('/api/lessons', lessonsRouter)

module.exports = server