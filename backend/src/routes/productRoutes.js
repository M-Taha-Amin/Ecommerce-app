const express = require('express');
const router = express.Router();
const { productController } = require('../container');
const asyncHandler = require('../middlewares/asyncHandler');

router
  .route('/products')
  .get(asyncHandler(productController.getAllProducts))
  .post(asyncHandler(productController.createProduct));

router
  .route('/products/:id')
  .get(asyncHandler(productController.getOneProduct))
  .put(asyncHandler(productController.updateProduct))
  .delete(asyncHandler(productController.deleteProduct));

module.exports = router;
