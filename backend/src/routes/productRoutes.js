const express = require('express');
const router = express.Router();
const { productController } = require('../container');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  validateQueryParams,
  validateCreateProduct,
  validateUpdateProduct,
} = require('../middlewares/productValidation');
const { validateID } = require('../middlewares/validateMongodbID');

router
  .route('/products')
  .get(validateQueryParams, asyncHandler(productController.getAllProducts))
  .post(validateCreateProduct, asyncHandler(productController.createProduct));

router
  .route('/products/:id')
  .all(validateID)
  .get(asyncHandler(productController.getOneProduct))
  .put(validateUpdateProduct, asyncHandler(productController.updateProduct))
  .delete(asyncHandler(productController.deleteProduct));

module.exports = router;
