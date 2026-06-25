const express = require('express');
const router = express.Router();
const { productController } = require('../container');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  validateQueryParams,
  validateCreateProduct,
  validateUpdateProduct,
  validateAddReview,
} = require('../middlewares/productValidation');
const { validateID, validateIDs } = require('../middlewares/validateMongodbID');
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
  .route('/products/:productId')
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

router
  .route('/products/:productId/reviews')
  .all(validateID)
  .get(asyncHandler(productController.getAllReviews))
  // Adds the review, but if exists already then updates existing one
  .post(
    isAuthenticated,
    validateAddReview,
    asyncHandler(productController.addReview),
  );

router
  .route('/products/:productId/reviews/:reviewId')
  .delete(
    validateID,
    isAuthenticated,
    asyncHandler(productController.deleteReview),
  );

module.exports = router;
