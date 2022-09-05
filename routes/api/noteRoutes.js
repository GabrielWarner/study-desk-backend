const router = require('express').Router();
const {
    getAllNotes,
    getNotes,
    addNote,
    createNote,
    deleteNote
} = require('../../controllers/noteController')


router.route('/').get(getAllNotes).post(createNote)

router.route("/:noteId").delete(deleteNote);

module.exports = router;