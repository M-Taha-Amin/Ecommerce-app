const config = require('../config');
const ApiResponse = require('../utils/apiResponse');
const { setAuthCookie, clearAuthCookie } = require('../utils/auth');

class AuthController {
  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
  }

  register = async (req, res, next) => {
    const newUser = await this.userService.createUser(req.validatedDto);
    const accessToken = this.authService.createAccessToken(newUser._id);
    setAuthCookie(res, accessToken);
    return ApiResponse.created(res, 'User Registered', newUser);
  };

  login = async (req, res, next) => {
    // verifies user exists and password is valid. If validated, returns the valid user from database
    const user = await this.userService.verifyCredentials(req.validatedDto);
    const accessToken = this.authService.createAccessToken(user._id);
    setAuthCookie(res, accessToken);
    return ApiResponse.success(res, 'User Logged In', user);
  };

  logout = async (req, res, next) => {
    clearAuthCookie(res);
    return ApiResponse.success(res, 'Logged Out');
  };
}

module.exports = AuthController;
