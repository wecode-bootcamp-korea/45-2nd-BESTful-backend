const express = require('express');
const router = express.Router();

const checkLogInToken = require('../utils/auth');
const feedController = require('../controllers/feedController');
const commentController = require('../controllers/commentController');
const bestController = require('../controllers/bestController');

router.get('', feedController.getAllFeed);
router.get('/best', feedController.getAllFeed);
router.get('/:feedId/comment', commentController.getCommentByFeedId);
router.post('/upload', checkLogInToken, feedController.uploadFeed);


module.exports = { router };
