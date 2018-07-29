const express = require('express');
const passport = require('passport');

const controllers = require('../controllers/userControllers');
const { ensureAuthenticated, validateNewUser, validateId, validatePassword } = require('../controllers/userValidators');
const { errorResponse } = require('../controllers/errorControllers');

const usersRouter = express.Router();

usersRouter.route('/register')
  .post(
    validateNewUser, 
    errorResponse, 
    controllers.registerUser, 
    passport.authenticate('local', { failureRedirect: '/badLogin' }),
    controllers.getUser
  );

usersRouter.route('/login')
  .post(passport.authenticate('local', { failureRedirect: '/badLogin' }), controllers.getUser);

usersRouter.route('/logout')
  .get(controllers.logout);

usersRouter.route('/:userId')
  .get(ensureAuthenticated, validateId, errorResponse, controllers.getUser) 
  .put(ensureAuthenticated, validateId, validatePassword, errorResponse, controllers.updatePassword)
  .delete(ensureAuthenticated, validateId, errorResponse, controllers.deleteUser);

// this is temporary handle
usersRouter.route('/badLogin')
  .get((req, res) => {
    res.sendStatus(400);
  })

// handle for unauthorized user related actions
usersRouter.route('/unauthorized')
  .get((req, res) => {
    res.status(401).json({ "message": "action not allowed" });
  });

module.exports = usersRouter;