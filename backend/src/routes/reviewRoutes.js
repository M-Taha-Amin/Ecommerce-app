const express = require('express');
const router = express.Router();
const { reviewController } = require('../container');
const asyncHandler = require('../middlewares/asyncHandler');
const { validateID, validateIDs } = require('../middlewares/validateMongodbID');
const { validateAddReview } = require('../middlewares/reviewValidation');
const { isAuthenticated, isAdmin } = require('../middlewares/authValidation');

router
  .route('/products/:productId/reviews')
  .all(validateID)
  .get(asyncHandler(reviewController.getAllReviews))
  // Adds the review, but if exists already then updates existing one
  .post(
    isAuthenticated,
    validateAddReview,
    asyncHandler(reviewController.addReview),
  );

router
  .route('/products/:productId/reviews/:reviewId')
  .delete(
    validateID,
    isAuthenticated,
    asyncHandler(reviewController.deleteReview),
  );

module.exports = router;
