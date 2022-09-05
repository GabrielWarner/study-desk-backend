const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");
const { Note, User } = require('../models')



module.exports = {
    getAllNotes(req, res) {
        const userid = req.query.userid;
        Note.find({ userid  })
        .then((allNotes)=>res.json(allNotes))
        .catch((err) => res.status(500).json(err))
    },
    addNote(req, res) {

        const note = new Note({
            // id: uuidv4(),
            text:req.body.text,
            date:req.body.date,
            userid:req.body.userid,
        })

        note.save((error, result) => {
            console.log(result._id)
            if(!result) {
                
                return res.status(404).json({message:"invaild input"})
                
            }

            // TODO: Update the user model with the note id
            User.findOneAndUpdate({_id: req.body.userid}, { notes: [result._id] })
            res.json(result)
        })
       
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