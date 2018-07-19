/* --- requests ---
0 - createPool ---> name, creator?, options
1 - getPool ---> poolId
2 - deletePool ---> poolId
3 - vote ---> poolId, optionId
4 - followPool ---> poolId, followerId
5 - unfollowPool ---> poolId, followerId
6 - addOption ---> poolId, option(id, value)
7 - removeOption ---> poolId, optionId
*/

/* --- what to validate ---
0 - name ---> string
1 - creator ---> isMongoId
2 - option ---> id: number, value: string
3 - poolId ---> isMongoId
4 - optionId ---> number
5 - followerId ---> isMongoId
*/
const check = require('express-validator/check');
const filter = require('express-validator/filter');

// validates name and creator
const validatePool = [
  check.body(['name', 'creator', 'options'])
    .exists(),
  filter.sanitizeBody(['name', 'creator'])
    .trim()
    .escape(),
  check.body('creator')
    .isMongoId()
];
const validatePoolId = [
  check.check('poolId')
    .exists()
    .isMongoId()
];
const validateFollowerId = [
  check.check('followerId')
    .exists()
    .isMongoId()
];
const validateOptionId = [
  check.check('optionId')
    .exists()
    .isInt()
];
const validateOption = [
  check.body(['id', 'value'])
    .exists(),
  check.body('id')
    .isInt(),
  filter.sanitizeBody('value')
    .trim()
    .escape()
];
const validateOptions = (req, res, next) => {
  if (!Array.isArray(req.body.options)) return res.sendStatus(400);

  req.body.optopns = req.body.options.map(option => {
    return {
      id: parseInt(option._id) || '',
      value: JSON.stringify(option.value) || ''
    };
  });

  next();
}
// write options validator

module.exports = {
  validatePool, 
  validatePoolId,
  validateFollowerId,
  validateOptionId,
  validateOption,
  validateOptions
}

