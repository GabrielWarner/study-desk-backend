const router = require('express').Router();
const {
    getAllNotes,
    addNote,
    deleteNote
} = require('../../controllers/noteController')


router.route('/').get(getAllNotes).post(addNote)

router.route("/:noteId").delete(deleteNote);

module.exports = router;