const router = require('express').Router();
const {
    getAllEvents,
    addEvent,
    getOneEvent,
    removeEvent
} = require('../../controllers/eventController')


router.route('/:userId').get(getAllEvents).post(addEvent)

router.route('/:userId/:eventId').get(getOneEvent).delete(removeEvent)

module.exports = router;