const express = require('express');
const poolsRouter = require('./pools');
const usersRouter = require('./users');

const router = express.Router();

router.use('/pools', poolsRouter);
router.use('/users', usersRouter);

module.exports = router;
