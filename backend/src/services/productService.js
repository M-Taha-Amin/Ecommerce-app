const ApiError = require('../utils/apiError');

class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }

  getAllProducts = async () => {
    return this.repository.getAll();
  };

  getOneProduct = async id => {
    const product = await this.repository.getOne(id);
    if (product === null) {
      throw new ApiError('Product not found', 404);
    }
    return product;
  };

  createProduct = async productData => {
    return this.repository.insert(productData);
  };

  updateProduct = async (id, updatedData) => {
    const updated = await this.repository.update(id, updatedData);
    if (updated === null) {
      throw new ApiError('Product not found', 404);
    }
    return updated;
  };

  deleteProduct = async id => {
    const deleted = await this.repository.delete(id);
    if (deleted === null) {
      throw new ApiError('Product not found', 404);
    }
    return deleted;
  };
}

module.exports = ProductService;
