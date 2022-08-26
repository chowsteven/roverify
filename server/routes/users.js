const express = require('express');
const router = express.Router();
const { userSignup, userLogin } = require('../controllers/userController');

// User sign-up
router.post('/signup', userSignup);

// User login
router.post('/login', userLogin);

module.exports = router;
