const router = require('express').Router();
const {
    getAllEvents,
    addEvent
} = require('../../controllers/')


router.route('/').get(getAllEvents).post(addEvent)