// Product Imports
const productModel = require('./models/productModel');
const ProductRepository = require('./repositories/productRepository');
const ProductService = require('./services/productService');
const ProductController = require('./controllers/productController');

// User Imports
const userModel = require('./models/userModel');
const UserRepository = require('./repositories/userRepository');
const UserService = require('./services/userService');
const UserController = require('./controllers/userController');

// Auth Imports
const AuthService = require('./services/authService');
const AuthController = require('./controllers/authController');

// Email Imports
const EmailService = require('./services/emailService');
const nodemailerTransporter = require('./config/nodemailer');

// Otp Imports
const otpModel = require('./models/otpModel');
const OtpRepository = require('./repositories/otpRepository');
const OtpService = require('./services/otpService');

// Review Imports
const reviewModel = require('./models/reviewModel');
const ReviewRepository = require('./repositories/reviewRepository');
const ReviewService = require('./services/reviewService');
const ReviewController = require('./controllers/reviewController');

// Product Dependency Injection
const productRepository = new ProductRepository(productModel);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Review Dependency Injection
const reviewRepository = new ReviewRepository(reviewModel);
const reviewService = new ReviewService(reviewRepository, productService);
const reviewController = new ReviewController(reviewService);

// User Dependency Injection
const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Otp Dependency Injection
const otpRepository = new OtpRepository(otpModel);
const otpService = new OtpService(otpRepository);

// Email Service Instantiation
const emailService = new EmailService(nodemailerTransporter);

// Auth Dependency Injection
const authService = new AuthService(userService, otpService, emailService);
const authController = new AuthController(authService);

module.exports = {
  productController,
  authController,
  userController,
  reviewController,
  authService,
  userService,
};
