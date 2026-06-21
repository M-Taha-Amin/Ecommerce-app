const { authService, userService } = require('../container');
const ApiError = require('../utils/apiError');
const { validate } = require('../utils/validateRequest');
const {
  registerUserSchema,
  loginUserSchema,
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
