const { Note } = require('../models')

module.exports = {
    getAllNotes(req, res) {
        Note.find({})
        .then((allNotes)=>res.json(allNotes))
        .catch((err) => res.status(500).json(err))
    },
    addNote(req, res) {
        Note.create({
            id:req.body.id,
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