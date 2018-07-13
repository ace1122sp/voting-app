const express = require('express');
const poolsRouter = express.Router();

poolsRouter.route('/')
  .get() // return pool cards
  .post() // create new pool 

poolsRouter.route('/:poolId')
  .get() // get pool
  .delete() // delete pool
  
poolsRouter.patch('/:poolId/votes'); // update votes

poolsRouter.route('/:poolId/followers')
  .put(); // add new follower

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(); // remove follower

poolsRouter.route('/:poolId/options')
  .put(); // add a new option

poolsRouter.route('/:poolId/options/:optionId')
  .delete(); // delete an option

module.exports = poolsRouter;
