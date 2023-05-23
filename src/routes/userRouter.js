const express = require('express');
const checkLogInToken = require('../utils/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);

module.exports = { router };
