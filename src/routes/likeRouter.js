const express = require('express');
const checkLogInToken = require('../utils/auth');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/:feedId', checkLogInToken, likeController.likeFeeds);
router.delete('/:feedId', checkLogInToken, likeController.unlikeFeeds);

module.exports = { router };
