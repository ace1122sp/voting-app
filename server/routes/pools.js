const express = require('express');
const poolsRouter = express.Router();
const controllers = require('../controllers/poolControllers');

poolsRouter.route('/')
  .get(controllers.getPools) // return pool cards
  .post(controllers.createPool) // create new pool 

poolsRouter.route('/:poolId')
  .get(controllers.getPool) // get pool
  .delete(controllers.deletePool) // delete pool
  
poolsRouter.patch('/:poolId/votes', controllers.vote); // update votes

poolsRouter.route('/:poolId/followers')
  .put(controllers.followPool); // add new follower

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(controllers.unfollowPool); // remove follower

poolsRouter.route('/:poolId/options')
  .put(controllers.addOption); // add a new option

poolsRouter.route('/:poolId/options/:optionId')
  .delete(controllers.removeOption); // delete an option

module.exports = poolsRouter;
