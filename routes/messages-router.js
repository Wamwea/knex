const express = require('express')
const Lessons = require('../models/dbHelpers')

const router = express.Router()

router.delete('/:id',(req,res)=>{
    Lessons.removeMessage(req.params.id).then(count =>{
        if(count >0){
            res.status(200).json({message: 'Message deleted successfully'})
        } else {
            res.status(400).json({message: 'No message with that id'})
        }
    }).catch(err=>res.status(500).json({message: 'Error deleting record'}))
})

module.exports = router