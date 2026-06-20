const mongoose = require('mongoose');
const ApiError = require('../utils/apiError');

exports.validateID = function (req, res, next) {
  const valid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (valid) next();
  else throw new ApiError('Invalid Resource ID', 400);
};
