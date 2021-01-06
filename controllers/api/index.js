const router = require('express').Router();
const userRoutes = require('./userRoutes');
const appointmentRoutes = require('./appointmentRoutes');

router.use('/users', userRoutes);
router.use('/appointment',appointmentRoutes);

module.exports = router;