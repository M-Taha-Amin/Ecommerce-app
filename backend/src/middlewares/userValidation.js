const { validate } = require('../utils/validateRequest');
const {
  updatePasswordSchema,
  updateProfileSchema,
  queryParamSchema,
  updateRoleSchema,
} = require('../validationSchema/user');

// validates for Get All Users route for admin. Just checks if the admin wants to exclude himself from the list, if so the excludeSelf flag must be Boolean and set to true in query params
exports.validateQueryParams = function (req, res, next) {
  req.validatedDto = validate(queryParamSchema, req.query);
  next();
};

exports.validateUpdatePassword = function (req, res, next) {
  req.validatedDto = validate(updatePasswordSchema, req.body);
  next();
};

exports.validateUpdateProfile = function (req, res, next) {
  req.validatedDto = validate(updateProfileSchema, req.body);
  next();
};

exports.validateUpdateRole = function (req, res, next) {
  req.validatedDto = validate(updateRoleSchema, req.body);
  next();
};
