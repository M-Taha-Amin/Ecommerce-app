const ApiResponse = require('../utils/apiResponse');

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAllProducts = async (req, res, next) => {
    const products = await this.productService.getAllProducts();
    return ApiResponse.success(res, 'Products Fetched', products);
  };

  getOneProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = await this.productService.getOneProduct(id);
    return ApiResponse.success(res, 'Product Found', product);
  };

  createProduct = async (req, res, next) => {
    const productData = req.body;
    const newProduct = await this.productService.createProduct(productData);
    return ApiResponse.created(res, 'New Product Added', newProduct);
  };

  updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateData,
    );
    return ApiResponse.success(res, 'Product Updated', updatedProduct);
  };

  deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    await this.productService.deleteProduct(id);
    return ApiResponse.noContent(res, 'Product Deleted');
  };
}

module.exports = ProductController;
