const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");
const { Note } = require('../models')



module.exports = {
    getAllNotes(req, res) {
        Note.find({})
        .then((allNotes)=>res.json(allNotes))
        .catch((err) => res.status(500).json(err))
    },
    addNote(req, res) {
        //TODO: Get ID to be between 12 byes or a string of 24 hex characters or an integer
        const newId = new mongoose.Types.ObjectId()
        Note.create({
            // id: uuidv4(),
            text:req.body.text,
            date:req.body.date
        })
        .then((addNote)=>{
            if(!addNote) {
                return res.status(404).json({message:"invaild input"})
            }
            res.json(addNote)
        })
        .catch((err) => res.status(500).json(err))
    }
}