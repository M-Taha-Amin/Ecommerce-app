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
}

module.exports = ProductService;
