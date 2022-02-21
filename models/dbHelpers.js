// Where we write knex queries
// const knex = require('knex')    
// const knexfile = require('../knexfile')
// const db = knex(knexfile.development)
const db = require('../dbConfig')
module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addMessage,
    findMessageById,
    findLessonMessages,
    removeMessage
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

function findMessageById(id){
    return db('messages').where({id}).first()
}

//Adding records from child table
async function addMessage(message, lesson_id){
    const [id] = await db('messages').where({lesson_id: lesson_id}).insert(message)
    return findMessageById(id)
}

function findLessonMessages(){
    return db('lessons as l').join('messages as m', 'l.id', 'm.lesson_id').select(
        'l.id as LessonID',
        'l.name as LessonName',
        'm.id as MessageID',
        'm.sender', 
        'm.text'
    )
}

//Remove record from child table
function removeMessage(id){
    return db('messages').where({id}).del()
}