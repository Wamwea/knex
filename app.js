//To load environment files into process.env we install a package called 'dotenv'
//DO NOT PUSH ENVIRONMENT FILE TO GITHUB
require('dotenv').config()
const server = require('./api/server')

const port = process.env.PORT || 5000

server.listen(port,()=> console.log('Listening on PORT ',port))
