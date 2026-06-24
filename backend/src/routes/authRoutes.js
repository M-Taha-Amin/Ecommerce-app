const express = require('express');
const router = express.Router();
const { authController } = require('../container');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  validateRegister,
  validateLogin,
  isAuthenticated,
  validateForgotPassword,
  validateResetPassword,
  validateVerifyOtp,
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
router
  .route('/auth/forgot-password')
  .post(validateForgotPassword, asyncHandler(authController.forgotPassword));
router
  .route('/auth/verify-otp')
  .post(validateVerifyOtp, asyncHandler(authController.verifyOtp));
router
  .route('/auth/reset-password')
  .post(validateResetPassword, asyncHandler(authController.resetPassword));
router
  .route('/auth/me')
  .post(isAuthenticated, asyncHandler(authController.getMe));

module.exports = router;
