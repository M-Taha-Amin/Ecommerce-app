const z = require('zod');
const ApiError = require('./apiError');

exports.validate = function (schema, inputObject) {
  const result = schema.safeParse(inputObject);
  if (result.success) {
    return result.data;
  } else {
    throw new ApiError('Bad Request', 400);
  }
};
