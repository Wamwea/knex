const express = require('express')
const Lessons = require('../models/dbHelpers')

const router = express.Router()

router.post('/', (req,res)=>{
    Lessons.add(req.body).then(lesson => {
        res.status(200).json(lesson)
    }).catch(error => res.status(500).json({message: 'unable to add lesson'}))
})

router.get('/',(req,res)=>{
    Lessons.find().then(lesson =>{
        res.status(200).json(lesson)
    }).catch(err =>{ res.status(500).json({message: `unable to retrieve lessons: ${err}`})})
})

router.get('/:id', (req,res)=>{
    const { id } = req.params
    
    Lessons.findById(id).then(lesson =>{
        if(lesson){
        res.status(200).json(lesson)
        }
        else{
        res.status(404).json({message: 'record not found'})
        }
    }).catch(err =>res.status(500).json({message: `unable to retrieve lesson ${err}`}))     
})

router.delete('/:id', (req,res)=>{
    Lessons.remove(req.params.id).then(count=>{
        if(count>0){
            res.status(200).json({message: 'Successfully deleted'})
        }
        else{res.status(404).json({message: 'no records to delete found'})}
    }).catch(err => res.status(500).json({message: `unable to delete record ${err}`}))
})

router.patch('/:id',(req,res)=>{
    console.log("PATCHING")
    const { id } = req.params
    Lessons.update(id, req.body).then(lesson =>{
        if(lesson){
            res.status(200).json(lesson)
        }
        else{
            res.status(404).json({message: 'not found'})
        }
    }).catch(err=>res.status(500).json({message: `Error updating : ${err}`}))
})

router.post('/:id/messages',(req,res)=>{
    const { id } = req.params
    const msg = req.body;

    if(!msg.lesson_id){
        msg['lesson_id'] = id
    }
    Lessons.findById(id).then(lesson=>{
        if(!lesson) res.status(404).json({message: 'invalid index'})
        if(!msg.sender || !msg.text){
            res.status(400).json({message: 'must provide both Sender and Text values'})
        }

        Lessons.addMessage(msg, id).then(message=>{
            if(message) res.status(200).json(message)
        }).catch(err => res.status(500).json({message: `Error adding message ${err}`}))
    })
    
})

router.get('/:id/messages',(req,res)=>{
    Lessons.findLessonMessages(req.params.id).then(lessons=>{
        res.status(200).json(lessons)
    }).catch(err => res.status(500).json({message :`Unable to fetch lessons: ${err}`})) 
})

module.exports = router