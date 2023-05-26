const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const commentController = require('../controllers/commentController');
const auth = require('../utils/auth');

router.get('', feedController.getAllFeed);
router.get('/:feedId/comment', commentController.getCommentByFeedId);

module.exports = { router };