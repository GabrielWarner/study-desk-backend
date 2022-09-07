const { ObjectId } = require('mongoose').Types;
const { Event, User } = require('../models');
const { events } = require('../models/User');

module.exports = {
    getAllEvents(req, res) {
        const userId = req.params.userId;
        Event.find({ userId })
            .then((allEvents) => res.json(allEvents))
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

        let eventObj = {}

        Event.create({
            userId: req.params.userId,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end
        })
            .then((event) => {
                if (!event) {
                    return res.status(404).json({ message: "invaild input" })
                }
                eventObj += event
                return User.findByIdAndUpdate(
                    {
                        _id: req.params.userId
                    },
                    {
                        $addToSet: { events: event._id }
                    },
                    { new: true }
                );
            })
            .then((user) => !user
                ? res.status(404).json({
                    message: 'Event created, but found no user with that ID',
                })
                : res.json(eventObj))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    removeEvent(req, res) {
        Event.findByIdAndDelete({ _id: req.params.eventId })
            .then((removeEvent) => {
                if (!removeEvent) {
                    return res.status(404).json({ message: "invalid ID" })
                }
            })
            .then(() => {
                const userId = req.params.userId;
                Event.find({ userId })
                    .then((allEvents) => res.json(allEvents))
                    .catch((err) => res.status(500).json(err))
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
}