const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");
const { Note, User } = require('../models')



module.exports = {
    getAllNotes(req, res) {
        const userId = req.params.userid;
        Note.find({ userId  })
        .then((allNotes)=>res.json(allNotes))
        .catch((err) => res.status(500).json(err))
    },
    // getNotes(req, res) {
    //     Note.find({})
    //       .select('-__v')
    //       .then((notes) => res.json(notes))
    //       .catch((err) => res.status(500).json(err));
    //   },

    // addNote(req, res) {

    //     const note = new Note({
    //         // id: uuidv4(),
    //         text:req.body.text,
    //         date:req.body.date,
    //         userid:req.body.userid,
    //     })

    //     note.save((error, result) => {
    //         console.log(result._id)
    //         if(!result) {
                
    //             return res.status(404).json({message:"invaild input"})
                
    //         }

    //         // TODO: Update the user model with the note id
    //         User.findOneAndUpdate({_id: req.body.userid}, { notes: [result._id] })
    //         res.json(result)
    //     })
       
    // },
    createNote(req, res) {
        console.log(req.body);
        Note.create({
            text:req.body.text,
            date:req.body.date,
            userId:req.body.userId,
        })
          .then((note) => {
            User.findByIdAndUpdate({_id: req.body.userId}, {  $addToSet: {notes: note._id} }, {new: true })
            .then(()=>{
              res.json(note) 
            }).
            catch((error) => {
              console.log(error);
              return res.status(500).json({msg:" unable to add note to user", error})
            })
          })
        
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    
    //   createNote(req, res) {
    //     Note.create({
            
    //         text:req.body.text,
    //         date:req.body.date,
    //         userId: req.params.userId,
            
    //     })
    //     .then((note)=>{
    //         if(!note) {
    //             return res.status(404).json({message:"invaild input"})
    //         }
    //         return User.findByIdAndUpdate(
    //             {
    //                 _id: req.params.userId
    //             },
    //             { 
    //                 $addToSet: {notes: note._id} 
    //             },
    //             { new: true }
    //         );
    //     })
    //     .then((user) => !user
    //     ? res.status(404).json({
    //         message: 'Note created, but found no user with that ID',
    //       })
    //     : res.json('Created the note 🎉'))
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
    // },  

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