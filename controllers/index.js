const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes); // Routes for pages
router.use('/', userRoutes); // Routes for user data flow
router.use('/api', apiRoutes);

module.exports = router;
