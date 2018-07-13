const express = require('express');
const usersRouter = express.Router();

usersRouter.route('/:userId')
  .get() // get user info
  .put() // change password
  .delete() // delete user

module.exports = usersRouter;