const router = require('express').Router();
const { roleCheck } = require('../middlewares/authorization');
const { protect } = require('../middlewares/authentication');

// Authentication
router.use('/api/auth', require('./authentication'));

module.exports = router;
