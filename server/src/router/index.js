const { Router } = require('express');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const chatRouter = require('./contestRouter');

const router = Router();
router.use('/', userRouter);
router.use('/', contestRouter);
router.use('/', chatRouter);


module.exports = router;
