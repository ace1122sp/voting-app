const express = require('express');

const controllers = require('../controllers/userControllers');
const { validateNewUser, validateId, validatePassword } = require('../controllers/userValidators');
const { errorResponse } = require('../controllers/errorControllers');

const usersRouter = express.Router();

usersRouter.route('/')
  .post(validateNewUser, errorResponse, controllers.createUser);

usersRouter.route('/:userId')
  .get(validateId, errorResponse, controllers.getUser) 
  .put(validateId, validatePassword, errorResponse, controllers.updatePassword)
  .delete(validateId, errorResponse, controllers.deleteUser);

module.exports = usersRouter;