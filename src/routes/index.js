const express = require('express');

const router = express.Router();
const express = require('express');
const userRouter = require('./userRouter');
const feedRouter = require('./feedRouter');
const commetRouter = require('./commentRouter');

<<<<<<< HEAD
const router = express.Router();

=======
>>>>>>> main
router.use('/users', userRouter.router);
router.use('/feeds', feedRouter.router);
router.use('/comment', commetRouter.router);

module.exports = router;
