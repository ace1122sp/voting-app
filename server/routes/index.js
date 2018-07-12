const express = require('express');
const poolsRouter = require('./pools');
const router = express.Router();

router.use('/pools', poolsRouter);

module.exports = router;
