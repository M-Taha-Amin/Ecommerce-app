const mongoose = require('mongoose');
const ApiError = require('../utils/apiError');

exports.validateID = function (req, res, next) {
  for (const key of Object.keys(req.params)) {
    const valid = mongoose.Types.ObjectId.isValid(req.params[key]);
    if (!valid) throw new ApiError('Invalid Resource ID', 400);
  }
  next();
};
