const { validate } = require('../utils/validateRequest');
const { addReviewSchema } = require('../validationSchema/review');

exports.validateAddReview = function (req, res, next) {
  req.validatedDto = validate(addReviewSchema, req.body);
  next();
};
