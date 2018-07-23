const express = require('express');
const { validationResult } = require('express-validator/check');
const { validatePool, validatePoolId, validateFollowerId, validateOptionId, validateOption, validateOptions } = require('../controllers/poolValidators');

const controllers = require('../controllers/poolControllers');

const poolsRouter = express.Router();

const _validatorErrorResponse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
}

poolsRouter.route('/')
  .get(controllers.getPools) 
  .post(validatePool, validateOptions, _validatorErrorResponse, controllers.createPool);

poolsRouter.route('/:poolId')
  .get(validatePoolId, _validatorErrorResponse, controllers.getPool) 
  .delete(validatePoolId, _validatorErrorResponse, controllers.deletePool);
  
poolsRouter.patch('/:poolId/votes', validatePoolId, validateOptionId, _validatorErrorResponse, controllers.vote);

poolsRouter.route('/:poolId/followers')
  .put(validatePoolId, validateFollowerId, _validatorErrorResponse, _validatorErrorResponse, controllers.followPool); 

poolsRouter.route('/:poolId/followers/:followerId')
  .delete(validatePoolId, validateFollowerId, _validatorErrorResponse, controllers.unfollowPool);

poolsRouter.route('/:poolId/options')
  .put(validatePoolId, validateOption, _validatorErrorResponse, controllers.addOption);

poolsRouter.route('/:poolId/options/:optionId')
  .delete(validatePoolId, validateOptionId, _validatorErrorResponse, controllers.removeOption);

module.exports = poolsRouter;