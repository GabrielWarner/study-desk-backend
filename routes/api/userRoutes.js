const router = require('express').Router();
const {
    getUsers,
    postUser,
    getOneUser,
    updateUser,
    removeUser,
    findOne
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser)

router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser)

// JWT
router.route('/login').post(findOne)

// router.route('/protected').get()

module.exports = router;