const express = require('express');

const { validatePool, validatePoolId, validateFollowerId, validateOptionId, validateOption, validateOptions } = require('../controllers/poolValidators');
const controllers = require('../controllers/poolControllers');
const { errorResponse } = require('../controllers/errorControllers');

const poolsRouter = express.Router();

poolsRouter.route('/')
  .get(controllers.getPools) 
  .post(validatePool, validateOptions, errorResponse, controllers.createPool);

poolsRouter.route('/:poolId')
  .get(validatePoolId, errorResponse, controllers.getPool) 
  .delete(validatePoolId, errorResponse, controllers.deletePool);
  
poolsRouter.patch('/:poolId/votes', validatePoolId, validateOptionId, errorResponse, controllers.vote);

poolsRouter.route('/:poolId/followers')
  .patch(validatePoolId, validateFollowerId, errorResponse, controllers.followPool); 

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(validatePoolId, validateFollowerId, errorResponse, controllers.unfollowPool);

poolsRouter.route('/:poolId/options')
  .patch(validatePoolId, validateOption, errorResponse, controllers.addOption);

poolsRouter.route('/:poolId/options/:optionId')
  .delete(validatePoolId, validateOptionId, errorResponse, controllers.removeOption);

module.exports = poolsRouter;