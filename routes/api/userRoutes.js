const router = require('express').Router();
const {
    getUsers,
    postUser,
    getOneUser,
    updateUser,
    removeUser,
    findOne,
    protected
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser)

// JWT
router.route('/login').post(findOne)
router.route('/protected').get(protected)

// CRUD
router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser)



module.exports = router;