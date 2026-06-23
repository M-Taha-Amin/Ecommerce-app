const ApiResponse = require('../utils/apiResponse');
const { setAuthCookie, clearAuthCookie } = require('../utils/auth');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    const { newUser, accessToken } = await this.authService.register(
      req.validatedDto,
    );
    setAuthCookie(res, accessToken);
    return ApiResponse.created(res, 'User Registered', newUser);
  };

  login = async (req, res) => {
    const { user, accessToken } = await this.authService.login(
      req.validatedDto,
    );
    setAuthCookie(res, accessToken);
    return ApiResponse.success(res, 'User Logged In', user);
  };

  logout = async (req, res) => {
    clearAuthCookie(res);
    return ApiResponse.success(res, 'Logged Out');
  };

  forgotPassword = async (req, res) => {
    const { email } = req.validatedDto;
    await this.authService.forgotPassword(email);
    return ApiResponse.success(res, 'OTP sent to your Email Address');
  };

  verifyOtp = async (req, res) => {
    await this.authService.verifyOtp(req.validatedDto);
    return ApiResponse.success(res, 'OTP verified');
  };

  resetPassword = async (req, res) => {
    const { user, accessToken } = await this.authService.resetPassword(
      req.validatedDto,
    );
    setAuthCookie(res, accessToken);
    return ApiResponse.success(res, 'Password Reset');
  };
}

module.exports = AuthController;
