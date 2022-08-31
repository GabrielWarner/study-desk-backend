const router = require('express').Router();
const {
    getAllEvents,
    addEvent
} = require('../../controllers/eventController')


router.route('/').get(getAllEvents).post(addEvent)

module.exports = router;