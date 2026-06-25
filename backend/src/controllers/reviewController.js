const ApiResponse = require('../utils/apiResponse');

class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  getAllReviews = async (req, res, next) => {
    const { productId } = req.params;
    const reviews = await this.reviewService.getAllReviews(productId);
    return ApiResponse.success(res, 'Reviews Fetched', reviews);
  };

  addReview = async (req, res, next) => {
    const { productId } = req.params;

    const review = await this.reviewService.addReview(
      productId,
      req.user,
      req.validatedDto,
    );
    
    return ApiResponse.success(res, 'Review Added', review);
  };

  deleteReview = async (req, res, next) => {
    const { productId, reviewId } = req.params;
    await this.reviewService.deleteReview(productId, req.user, reviewId);
    return ApiResponse.noContent(res, 'Review Deleted');
  };
}

module.exports = ReviewController;
