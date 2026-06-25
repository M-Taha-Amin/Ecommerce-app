const ApiError = require('../utils/apiError');

class ReviewService {
  constructor(reviewRepository, productService) {
    this.repository = reviewRepository;
    this.productService = productService;
  }

  async getAllReviews(productId) {
    const reviews = await this.repository.getAll({ productId });
    return reviews;
  }

  async updateReview(reviewId, updatedData) {
    return this.repository.update(reviewId, updatedData);
  }

  async addReview(productId, user, reviewData) {
    const product = await this.productService.getOneProduct(productId);

    if (!product) {
      throw new ApiError('Product to Review not found', 404);
    }

    const existingReview = await this.repository.getOne({
      productId: productId.toString(),
      userId: user._id.toString(),
    });

    if (existingReview) {
      const updatedReview = await this.updateReview(
        existingReview._id,
        reviewData,
      );

      // Recalculating Rating for the product
      const newRatingSum =
        product.ratingSum - existingReview.rating + reviewData.rating;

      const newRating = newRatingSum / product.reviewCount;

      await this.productService.updateProduct(productId, {
        ratingSum: newRatingSum,
        rating: newRating,
      });

      return updatedReview;
    } else {
      reviewData.userId = user._id;
      reviewData.username = user.name;
      reviewData.productId = productId;

      const addedReview = await this.repository.insert(reviewData);

      const newRatingSum = product.ratingSum + reviewData.rating;
      const newReviewCount = product.reviewCount + 1;
      const newRating = newRatingSum / newReviewCount;

      await this.productService.updateProduct(productId, {
        ratingSum: newRatingSum,
        reviewCount: newReviewCount,
        rating: newRating,
      });

      return addedReview;
    }
  }

  async deleteReview(productId, user, reviewId) {
    const existingReview = await this.repository.getOne({
      _id: reviewId.toString(),
      productId: productId.toString(),
    });

    if (!existingReview) {
      throw new ApiError('Review not found', 404);
    }

    const isAdmin = user.role === 'admin';
    const isOwner = existingReview.userId.toString() === user._id.toString();

    if (!isAdmin && !isOwner) {
      throw new ApiError('Forbidden', 403);
    }

    await this.repository.delete(reviewId);

    // Remove the deleted review's rating from the product's rating
    const product = await this.productService.getOneProduct(productId);
    const newRatingSum = product.ratingSum - existingReview.rating;
    const newReviewCount = product.reviewCount - 1;
    const newRating = newRatingSum / newReviewCount;

    await this.productService.updateProduct(productId, {
      ratingSum: newRatingSum,
      reviewCount: newReviewCount,
      rating: newRating,
    });
  }
}

module.exports = ReviewService;
