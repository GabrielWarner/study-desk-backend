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
    },

    deleteNote(req,res){
        Note.findOneAndDelete({ _id: req.params.noteId })
        .then( (note) => {
            if (!note) {
                return res.status(404).json({ message: "No note found with this ID!" });
            }
            // GetAllNotes().then(setNotes())

            })
        .then(()=> res.json({message: "Note deleted!"}))
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err)
        });
    }
}