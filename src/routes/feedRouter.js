const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const feedController = require('../controllers/feedController');
const commentController = require('../controllers/commentController');
const bestController = require('../controllers/bestController');

router.get('', feedController.getAllFeed);
router.get('/best', feedController.getAllFeed);
router.get('/:feedId/comment', commentController.getCommentByFeedId);

module.exports = { router };
