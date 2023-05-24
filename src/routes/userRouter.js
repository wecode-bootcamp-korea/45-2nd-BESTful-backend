const express = require('express');

const checkLogInToken = require('../utils/auth');
const upload = require('../utils/s3').upload;
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/', checkLogInToken, userController.getUserById);
router.patch('/edit', checkLogInToken, userController.editUserInfo);
router.post('/image', checkLogInToken, upload.single("profileImage"), userController.uploadImageUrl)

module.exports = { router };
