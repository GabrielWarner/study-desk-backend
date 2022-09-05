const router = require('express').Router();
const {
    getAllEvents,
    addEvent,
    getOneEvent
} = require('../../controllers/eventController')


router.route('/').get(getAllEvents).post(addEvent)

router.route('/:eventId').get(getOneEvent)

module.exports = router;