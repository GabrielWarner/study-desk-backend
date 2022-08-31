const { Event } = require('../models')

module.exports = {
    getAllEvents(req, res) {
        Event.find({})
        .then((allEvents)=>res.json(allEvents))
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
            res.json(addEvent)
        })
        .catch((err) => res.status(500).json(err))
    }
}