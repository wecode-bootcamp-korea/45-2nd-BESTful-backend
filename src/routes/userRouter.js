const express = require('express');
const checkLogInToken = require('../utils/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/', userController.getUserById);
router.patch('/edit', userController.editUserInfo);
router.post('/image', checkLogInToken, upload.single("profileImage"), userController.uploadImageUrl)

module.exports = { router };
