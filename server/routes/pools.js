const express = require('express');
const poolsRouter = express.Router();

poolsRouter.route('/')
  .get()
  .post();

poolsRouter.route('/:poolId')
  .get()
  .delete();

poolsRouter.patch('/:poolId/:property');

module.exports = poolsRouter;
