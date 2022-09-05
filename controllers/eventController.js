const { ObjectId } = require('mongoose').Types;
const { Event, User } = require('../models');
const { events } = require('../models/User');

module.exports = {
    getAllEvents(req, res) {
        Event.find({})
        .then((allEvents)=>res.json(allEvents))
        .catch((err) => res.status(500).json(err))
    },
    getOneEvent(req, res) {
        Event.findOne({ _id: req.params.eventId })
            .then((event) => {
                if (!event) {
                    return res.status(404).json({ message: "invalid ID" })
                }
                res.json(event)
            })
            .catch((err) => res.status(500).json(err))
    },
    addEvent(req, res) {
        Event.create({
            title:req.body.title,
            start:req.body.start,
            end:req.body.end
        })
        .then((addEvent)=>{
            if(!addEvent) {
                return res.status(404).json({message:"invaild input"})
            }
            // return User.findByIdAndUpdate(
            //     {
            //         _id: req.param.userId
            //     },
            //     { 
            //         $addToSet: {events: events._id} 
            //     },
            //     { new: true }
            // )
            res.json(addEvent)
        })
        .catch((err) => res.status(500).json(err))
    },
    removeEvent(req, res) {
        Event.findByIdAndDelete({ _id: req.params.eventId })
            .then((removeEvent) => {
                if (!removeEvent) {
                    return res.status(404).json({ message: "invalid ID" })
                }
            })
            .then(() => res.json({message:'event removed'}))
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          })        
    },
}