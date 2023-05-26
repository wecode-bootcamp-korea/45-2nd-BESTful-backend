const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const feedRouter = require('./feedRouter');
const commentRouter = require('./commentRouter');
const followerRouter = require('./followerRouter');

router.use('/users', userRouter.router);
router.use('/feeds', feedRouter.router);
router.use('/comment', commentRouter.router);
router.use('/follower', followerRouter.router);

module.exports = router;
