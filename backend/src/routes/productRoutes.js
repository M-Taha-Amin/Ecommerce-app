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
const { isAuthenticated, isAdmin } = require('../middlewares/authValidation');

router
  .route('/products')
  .get(validateQueryParams, asyncHandler(productController.getAllProducts))
  .post(
    isAuthenticated,
    isAdmin,
    validateCreateProduct,
    asyncHandler(productController.createProduct),
  );

router
  .route('/products/:id')
  .all(validateID)
  .get(asyncHandler(productController.getOneProduct))
  .patch(
    isAuthenticated,
    isAdmin,
    validateUpdateProduct,
    asyncHandler(productController.updateProduct),
  )
  .delete(
    isAuthenticated,
    isAdmin,
    asyncHandler(productController.deleteProduct),
  );

module.exports = router;
