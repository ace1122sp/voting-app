const express = require('express');
const passport = require('passport');

const controllers = require('../controllers/userControllers');
const { ensureAuthenticated, validateNewUser, validatePassword } = require('../controllers/userValidators');
const { errorResponse } = require('../controllers/errorControllers');

const usersRouter = express.Router();

usersRouter.route('/register')
  .post(validateNewUser, errorResponse, controllers.registerUser, passport.authenticate('local', { failureRedirect: '/badLogin' }), 
    controllers.getUser
  );

usersRouter.route('/login')
  // .post(passport.authenticate('local', { failureRedirect: '/badLogin' }), controllers.getUser);
  .post(passport.authenticate('local'), controllers.getUser);

usersRouter.route('/logout')
  .get(controllers.logout);

usersRouter.route('/')
  .get(ensureAuthenticated, controllers.getUser) 
  .put(ensureAuthenticated, validatePassword, errorResponse, controllers.updatePassword)
  .delete(ensureAuthenticated, controllers.deleteUser);

usersRouter.all('/badLogin', (req, res) => {
  res.status(403).json({ "message": "username or password incorrect" });
});

usersRouter.route('/unauthorized')
  .get((req, res) => {
    res.status(401).json({ "message": "action not allowed" });
  });

module.exports = usersRouter;