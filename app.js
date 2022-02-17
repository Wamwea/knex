const express = require('express')
const Lessons = require('./models/dbHelpers')
const server = express()

server.use(express.json())

const PORT = 5000

server.listen(PORT,()=> console.log('Listening on PORT ',PORT))

server.get('/',(req,res)=>{
    res.json({message : 'received'})
})

server.post('/api/lessons', (req,res)=>{
    Lessons.add(req.body).then(lesson => {
        res.status(200).json(lesson)
    }).catch(error => res.status(500).json({message: 'unable to add lesson'}))
})

server.get('/api/lessons',(req,res)=>{
    Lessons.find().then(lesson =>{
        res.status(200).json(lesson)
    }).catch(err =>{ res.status(500).json({message: `unable to retrieve lessons: ${err}`})})
})

server.get('/api/lessons/:id', (req,res)=>{
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

server.delete('/api/lessons/:id', (req,res)=>{
    Lessons.remove(req.params.id).then(count=>{
        if(count>0){
            res.status(200).json({message: 'Successfully deleted'})
        }
        else{res.status(404).json({message: 'no records to delete found'})}
    }).catch(err => res.status(500).json({message: `unable to delete record ${err}`}))
})

server.patch('api/lessons/:id',(req,res)=>{
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