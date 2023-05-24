const express = require('express');
const checkLogInToken = require('../utils/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/', checkLogInToken, userController.getUserById);
router.patch('/edit', checkLogInToken, userController.editUserInfo);

module.exports = { router };
