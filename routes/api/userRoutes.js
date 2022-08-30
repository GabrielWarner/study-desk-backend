const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    updateUser,
    removeUser,
    findOne,
    checkToken,
    create
} = require('../../controllers/userController');


// JWT
router.route('/signup').post(create)
router.route('/login').post(findOne)
router.route('/check-token').get(checkToken)


// CRUD
router.route('/').get(getUsers)
router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser)



module.exports = router;