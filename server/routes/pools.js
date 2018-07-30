const express = require('express');

const { validatePool, validatePoolId, validateFollowerId, validateOptionId, validateOption, validateOptions } = require('../controllers/poolValidators');
const { ensureOwner, ensureAuthenticated } = require('../controllers/userValidators');
const controllers = require('../controllers/poolControllers');
const { errorResponse } = require('../controllers/errorControllers');

const poolsRouter = express.Router();

poolsRouter.route('/')
  .get(controllers.getPools) 
  // .post(ensureAuthenticated, validatePool, validateOptions, errorResponse, controllers.createPool);
  .post(ensureAuthenticated, validatePool, validateOptions, errorResponse, controllers.createPool);

poolsRouter.route('/:poolId')
  .get(validatePoolId, errorResponse, controllers.getPool) 
  .delete(ensureAuthenticated, validatePoolId, errorResponse, ensureOwner, controllers.deletePool);
  
poolsRouter.patch('/:poolId/votes', validatePoolId, validateOptionId, errorResponse, controllers.vote);

poolsRouter.route('/:poolId/followers')
  .patch(ensureAuthenticated, validatePoolId, validateFollowerId, errorResponse, controllers.followPool); 

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(ensureAuthenticated, validatePoolId, validateFollowerId, errorResponse, controllers.unfollowPool);

poolsRouter.route('/:poolId/options')
  .patch(ensureAuthenticated, validatePoolId, validateOption, errorResponse, controllers.addOption);

poolsRouter.route('/:poolId/options/:optionId')
  .delete(ensureAuthenticated, validatePoolId, validateOptionId, errorResponse, ensureOwner, controllers.removeOption);

module.exports = poolsRouter;