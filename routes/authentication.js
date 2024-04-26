const express = require('express');
const passport = require('passport');
const multer = require('multer');

const upload = multer();
const { registerUser } = require('../controllers/authentication');
const router = express.Router();
const { protect, googleCallback, ensureGoogleAuth } = require('../middlewares/authentication');

router.post('/register-user', registerUser);

module.exports = router;
