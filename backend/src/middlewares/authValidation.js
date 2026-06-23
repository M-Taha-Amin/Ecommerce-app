const { authService, userService } = require('../container');
const ApiError = require('../utils/apiError');
const { validate } = require('../utils/validateRequest');
const {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} = require('../validationSchema/auth');
const asyncHandler = require('./asyncHandler');

exports.validateRegister = function (req, res, next) {
  req.validatedDto = validate(registerUserSchema, req.body);
  next();
};

exports.validateLogin = function (req, res, next) {
  req.validatedDto = validate(loginUserSchema, req.body);
  next();
};

exports.validateForgotPassword = function (req, res, next) {
  req.validatedDto = validate(forgotPasswordSchema, req.body);
  next();
};

exports.validateVerifyOtp = function (req, res, next) {
  req.validatedDto = validate(verifyOtpSchema, req.body);
  next();
};

exports.validateResetPassword = function (req, res, next) {
  req.validatedDto = validate(resetPasswordSchema, req.body);
  next();
};

function makeIsAuthenticated(AuthService, UserService) {
  return asyncHandler(async function (req, res, next) {
    const { access_token } = req.cookies;
    if (!access_token) {
      throw new ApiError('Unauthorized', 401);
    }
    const decoded = AuthService.verifyAccessToken(access_token);
    const user = await UserService.getUserById(decoded.userId);

    if (!user) {
      throw new ApiError('Unauthorized', 401);
    }

    req.user = user;

    next();
  });
}

exports.isAuthenticated = makeIsAuthenticated(authService, userService);

// This middleware will only run if the user has been authenticated, which means req.user will always exist
exports.isAdmin = function (req, res, next) {
  if (req.user.role.toLowerCase() !== 'admin') {
    throw new ApiError('Forbidden', 403);
  } else next();
};
