/* --- what to validate ---
0 - username ---> does exist, is string
1 - password ---> does exist, is string
2 - email ---> does exist, is email format
3 - userId ---> does exist, is MongoObjectId
*/

const check = require('express-validator/check');
const filter = require('express-validator/filter');

const Pool = require('../models/pool');

const validateNewUser = [
  check.body(['username', 'email', 'password'])
    .exists(),
  check.body('email')
    .isEmail(),
  filter.sanitizeBody('username')
    .trim()
    .escape()
];
const validateId = [
  check.param('userId')
    .exists()
    .isMongoId()
];
const validatePassword = [
  check.check('newPassword')
    .exists()
];

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/unauthorized');
}

const ensureOwner = (req, res, next) => {
  // try to figure out better approach to validate ownership
  Pool.findById(req.params.poolId, (err, doc) => {
    if (err) {
      console.error(err.message);
      return res.sendStatus(400);
    }
    if (req.user._id !== doc.creator) return res.sendStatus(403);
    next();
  });
}

module.exports = {
  validateNewUser, 
  validateId,
  validatePassword,
  ensureAuthenticated,
  ensureOwner
};