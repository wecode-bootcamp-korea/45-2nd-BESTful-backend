const express = require('express');
const checkLogInToken = require('../utils/auth');
const followerController = require('../controllers/followerController');

const router = express.Router();

router.post('/', checkLogInToken, followerController.followUser);

module.exports = { router };
