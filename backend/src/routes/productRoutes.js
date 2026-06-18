const express = require('express');
const router = express.Router();

const ProductRepository = require('../repositories/productRepository');
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const repository = new ProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router.route('/products').get(controller.getAllProducts);

module.exports = router;
