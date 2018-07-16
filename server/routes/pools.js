const express = require('express');
const poolsRouter = express.Router();
const controllers = require('../controllers/poolControllers');

poolsRouter.route('/')
  .get(controllers.getPools) 
  .post(controllers.createPool);

poolsRouter.route('/:poolId')
  .get(controllers.getPool) 
  .delete(controllers.deletePool);
  
poolsRouter.patch('/:poolId/votes', controllers.vote);

poolsRouter.route('/:poolId/followers')
  .put(controllers.followPool); 

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(controllers.unfollowPool);

poolsRouter.route('/:poolId/options')
  .put(controllers.addOption);

poolsRouter.route('/:poolId/options/:optionId')
  .delete(controllers.removeOption);

module.exports = poolsRouter;
