const router = require('express').Router();
const {
    getUsers,
    postUser,
    getOneUser,
    updateUser,
    removeUser,
    findOne,
    checkToken
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser)

// JWT
router.route('/login').post(findOne)
router.route('/check-token').get(checkToken)

// CRUD
router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser)



module.exports = router;