const router = require('express').Router();
const {
    getAllEvents,
    addEvent,
    getOneEvent,
    removeEvent
} = require('../../controllers/eventController')


router.route('/').get(getAllEvents).post(addEvent)

router.route('/:eventId').get(getOneEvent).delete(removeEvent)

module.exports = router;