const express = require('express');
const router = express.Router();
const { authController } = require('../container');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  validateRegister,
  validateLogin,
  isAuthenticated,
} = require('../middlewares/authValidation');

router
  .route('/auth/register')
  .post(validateRegister, asyncHandler(authController.register));
router
  .route('/auth/login')
  .post(validateLogin, asyncHandler(authController.login));
router
  .route('/auth/logout')
  .post(isAuthenticated, asyncHandler(authController.logout));

module.exports = router;
