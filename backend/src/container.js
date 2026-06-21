// Product Imports
const productModel = require('./models/productModel');
const ProductRepository = require('./repositories/productRepository');
const ProductService = require('./services/productService');
const ProductController = require('./controllers/productController');

// User Imports
const userModel = require('./models/userModel');
const UserRepository = require('./repositories/userRepository');
const UserService = require('./services/userService');

// Auth Imports
const AuthService = require('./services/authService');
const AuthController = require('./controllers/authController');

// Product Dependency Injection
const productRepository = new ProductRepository(productModel);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// User Dependency Injection
const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository);

// Auth Dependency Injection
const authService = new AuthService();
const authController = new AuthController(authService, userService);

module.exports = {
  productController,
  authController,
  authService,
  userService,
};
