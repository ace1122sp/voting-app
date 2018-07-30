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
  check.body('creator')
    .isMongoId(),
  filter.sanitizeBody('name')
    .trim()
    .escape()
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

  req.body.options = req.body.options.map(option => {
    return {
      id: parseInt(option.id) || '',
      value: JSON.stringify(option.value) || ''
    };
  });

  next();
}

module.exports = {
  validatePool, 
  validatePoolId,
  validateFollowerId,
  validateOptionId,
  validateOption,
  validateOptions
}

