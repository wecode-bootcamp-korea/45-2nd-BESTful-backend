const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../utils/auth');

router.post('', auth, commentController.addComment);

module.exports = { router };
