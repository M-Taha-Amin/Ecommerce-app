const ProductModel = require('./models/productModel');
const ProductRepository = require('./repositories/productRepository');
const ProductService = require('./services/productService');
const ProductController = require('./controllers/productController');

const productRepository = new ProductRepository(ProductModel);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

module.exports = {
  productController,
};
