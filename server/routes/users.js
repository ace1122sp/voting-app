const express = require('express');
const usersRouter = express.Router();
const controllers = require('../controllers/userControllers');

usersRouter.route('/')
  .post(controllers.createUser);

usersRouter.route('/:userId')
  .get(controllers.getUser) 
  .put(controllers.updatePassword)
  .delete(controllers.deleteUser);

module.exports = usersRouter;