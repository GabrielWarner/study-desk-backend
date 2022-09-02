const router = require('express').Router();
const {
    getAllNotes,
    addNote,
    DeleteNote
} = require('../../controllers/noteController')


router.route('/').get(getAllNotes).post(addNote)

module.exports = router;