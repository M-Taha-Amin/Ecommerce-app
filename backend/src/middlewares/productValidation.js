const {
  queryParamSchema,
  createSchema,
  updateSchema,
} = require('../validationSchema/product');
const { validateRequest } = require('./validateRequest');

exports.validateQueryParams = function (req, res, next) {
  validateRequest(queryParamSchema, req.query, next);
};

exports.validateCreateProduct = function (req, res, next) {
  validateRequest(createSchema, req.body, next);
};

exports.validateUpdateProduct = function (req, res, next) {
  validateRequest(updateSchema, req.body, next);
};
