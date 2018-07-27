/* --- what to validate ---
0 - username ---> does exist, is string
1 - password ---> does exist, is string
2 - email ---> does exist, is email format
3 - userId ---> does exist, is MongoObjectId
*/

const check = require('express-validator/check');
const filter = require('express-validator/filter');

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

module.exports = {
  validateNewUser, 
  validateId,
  validatePassword
};