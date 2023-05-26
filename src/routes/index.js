const express = require('express');

const userRouter = require('./userRouter');
const feedRouter = require('./feedRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/feeds', feedRouter.router);

module.exports = router;
