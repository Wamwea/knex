const dbEngine = process.env.DB_ENVIRONMENT || 'development'
const config = require('./knexfile')['development']

module.exports = require('knex')(config)