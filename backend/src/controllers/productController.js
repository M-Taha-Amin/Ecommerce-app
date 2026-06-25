const ApiResponse = require('../utils/apiResponse');

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAllProducts = async (req, res, next) => {
    const products = await this.productService.getAllProducts(req.validatedDto);
    return ApiResponse.success(res, 'Products Fetched', products);
  };

  getOneProduct = async (req, res, next) => {
    const { productId } = req.params;
    const product = await this.productService.getOneProduct(productId);
    return ApiResponse.success(res, 'Product Found', product);
  };

  createProduct = async (req, res, next) => {
    const productData = req.validatedDto;
    // req.user will always exist, as this is an authenticated route and req will only reach here if user is logged in and is an admin
    productData.adminId = req.user._id;
    const newProduct = await this.productService.createProduct(productData);
    return ApiResponse.created(res, 'New Product Added', newProduct);
  };

  updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    const updateData = req.validatedDto;
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateData,
    );
    return ApiResponse.success(res, 'Product Updated', updatedProduct);
  };

  deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    await this.productService.deleteProduct(productId);
    return ApiResponse.noContent(res, 'Product Deleted');
  };
}

module.exports = ProductController;
