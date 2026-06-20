const {
  queryParamSchema,
  createSchema,
  updateSchema,
} = require('../validationSchema/product');
const { validate } = require('../utils/validateRequest');

exports.validateQueryParams = function (req, res, next) {
  req.validatedDto = validate(queryParamSchema, req.query);
  next();
};

exports.validateCreateProduct = function (req, res, next) {
  req.validatedDto = validate(createSchema, req.body);
  next();
};

exports.validateUpdateProduct = function (req, res, next) {
  req.validatedDto = validate(updateSchema, req.body);
  next();
};
