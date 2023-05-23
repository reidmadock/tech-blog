const router = require('express').Router();
const authRoutes = require('./authRoutes');
const dataRoutes = require('./dataRoutes');

// Account authorization functionality contained in these /api/auth routes 
router.use('/auth', authRoutes);
// Backend queries for (mostly) testing purposes in /api/data
router.use('/data', dataRoutes);

module.exports = router;