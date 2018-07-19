const express = require('express');
const poolsRouter = express.Router();
const controllers = require('../controllers/poolControllers');

const { validatePool, validatePoolId, validateFollowerId, validateOptionId, validateOption, validateOptions } = require('../controllers/poolValidators');

poolsRouter.route('/')
  .get(controllers.getPools) 
  .post(validatePool, controllers.createPool);

poolsRouter.route('/:poolId')
  .get(validatePoolId, controllers.getPool) 
  .delete(validatePoolId, controllers.deletePool);
  
poolsRouter.patch('/:poolId/votes', [validatePoolId, ...validateOptionId], controllers.vote);

poolsRouter.route('/:poolId/followers')
  .put(validatePoolId, validateFollowerId, controllers.followPool); 

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(validatePoolId, validateFollowerId, controllers.unfollowPool);

poolsRouter.route('/:poolId/options')
  .put(validateOption, controllers.addOption);

poolsRouter.route('/:poolId/options/:optionId')
  .delete(validatePoolId, validateOptionId, controllers.removeOption);

module.exports = poolsRouter;


// ubacio sam validatore ali iz nekog razloga ne rade