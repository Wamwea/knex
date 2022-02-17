// Where we write knex queries
const knex = require('knex')    
const knexfile = require('../knexfile')
const db = knex(knexfile.development)

module.exports = {
    add,
    find,
    findById,
    remove,
    update
} 

async function add(lesson){
    const [id] = await db('lessons').insert(lesson)
    return id
}

function find(){
    const lessons = db('lessons')
    return lessons
}

function findById(id){
    // if the variable name is same as the field name in the record, you can just say .where({id})
    return db('lessons').where({id: id}).first()
}

function remove(id){
    count = db('lessons').where({id}).del()
    return count
}

function update(id, changes){
    return db('lessons').where({id}).update(changes).then(()=>{return findById(id)})
}