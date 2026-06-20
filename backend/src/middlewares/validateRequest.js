const z = require('zod');
const ApiError = require('../utils/apiError');

exports.validateRequest = function (schema, inputObject, next) {
  const result = schema.safeParse(inputObject);
  if (result.success) {
    next();
  } else {
    throw new ApiError('Bad Request', 400);
  }
};
