const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for registering a new user
router.post('/user/register', userController.registerUser);

// Route for user login
router.post('/user/login', userController.loginUser);

module.exports = router;