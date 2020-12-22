const router = require('express').config();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;