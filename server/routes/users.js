const express = require('express');
const usersRouter = express.Router();
const controllers = require('../controllers/userControllers');

usersRouter.route('/')
  .post(controllers.createUser);

usersRouter.route('/:userId')
  .get(controllers.getUser) // get user info
  .put(controllers.updatePassword) // change password
  .delete(controllers.deleteUser); // delete user

module.exports = usersRouter;