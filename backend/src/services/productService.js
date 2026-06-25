const { PRODUCTS_PER_PAGE } = require('../constants');
const ApiError = require('../utils/apiError');

class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }

  async getAllProducts(options) {
    if (options.price_lte && options.price_gte) {
      if (options.price_gte >= options.price_lte) {
        throw new ApiError('Invalid price range', 400);
      }
    }

    // options.page will always exist, the validation schema will provide a default value of 1 for it if not sent with request
    options.skip = PRODUCTS_PER_PAGE * (options.page - 1);

    return this.repository.getAll(options);
  }

  async getOneProduct(id) {
    const product = await this.repository.getOne(id);
    if (product === null) {
      throw new ApiError('Product not found', 404);
    }
    return product;
  }

  async createProduct(productData) {
    return this.repository.insert(productData);
  }

  async updateProduct(id, updatedData) {
    const updated = await this.repository.update(id, updatedData);
    if (updated === null) {
      throw new ApiError('Product not found', 404);
    }
    return updated;
  }

  async deleteProduct(id) {
    const deleted = await this.repository.delete(id);
    if (deleted === null) {
      throw new ApiError('Product not found', 404);
    }
    return deleted;
  }

  async getAllReviews(productId) {
    const product = await this.getOneProduct(productId);
    if (!product) {
      throw new ApiError('Product Not Found', 404);
    }
    return product.reviews;
  }

  async addReview(productId, user, currentReview) {
    const product = await this.getOneProduct(productId);
    const exisingReviewIndex = product.reviews.findIndex(review => {
      return review.user.toString() === user._id.toString();
    });

    if (exisingReviewIndex !== -1) {
      product.reviews[exisingReviewIndex].rating = currentReview.rating;
      product.reviews[exisingReviewIndex].comment = currentReview.comment;
    } else {
      currentReview.user = user._id;
      currentReview.name = user.name;
      product.reviews.push(currentReview);
      product.num_of_reviews = product.reviews.length;
    }

    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    product.rating = totalRating / product.reviews.length;

    await product.save();

    return product.reviews;
  }

  async deleteReview(productId, user, reviewId) {
    let product = await this.getOneProduct(productId);

    if (user.role !== 'admin') {
      const review = product.reviews.find(
        r => r._id.toString() === reviewId.toString(),
      );

      if (!review) {
        throw new ApiError('Review not found', 404);
      }

      if (review.user.toString() !== user._id.toString()) {
        throw new ApiError('Unauthorized', 401);
      }
    }

    product = await this.repository.deleteReview(productId, reviewId);

    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    product.num_of_reviews = product.reviews.length;
    product.rating = totalRating / product.reviews.length;

    await product.save();
  }
}

module.exports = ProductService;
