const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
// Use homeRoutes file to route views
router.use('/',homeRoutes);

module.exports = router
