const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes')
const noteRoutes = require ('./noteRoutes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/notes', noteRoutes);

module.exports = router;