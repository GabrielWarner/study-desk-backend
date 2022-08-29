const router = require('express').Router();
const {
    getUsers,
    postUser,
    getOneUser,
    updateUser,
    removeUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser)

router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser)

module.exports = router;