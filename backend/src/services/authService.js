const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../utils/apiError');

class AuthService {
  constructor(userService, otpService, emailService) {
    this.userService = userService;
    this.otpService = otpService;
    this.emailService = emailService;
  }

  async register(userData) {
    const newUser = await this.userService.createUser(userData);
    const accessToken = this.createAccessToken(newUser._id);
    return { newUser, accessToken };
  }

  async login(userData) {
    const user = await this.userService.verifyCredentials(userData);
    const accessToken = this.createAccessToken(user._id);
    return { user, accessToken };
  }

  createAccessToken(userId) {
    const token = jwt.sign({ userId }, config.jwt.secret, config.jwt.options);
    return token;
  }

  verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      return decoded;
    } catch (error) {
      throw new ApiError('Unauthorized', 401);
    }
  }

  async forgotPassword(email) {
    await this.userService.verifyEmailExists(email);
    const otp = await this.otpService.generateAndSaveOtp(email);
    const emailMessage = `OTP for resetting your password is: ${otp}\n\nIf you did not request the otp, please ignore this message.`;
    await this.emailService.sendEmail(
      email,
      'OTP - Reset Password',
      emailMessage,
    );
  }

  async verifyOtp(requestData) {
    const { otp, email } = requestData;
    await this.otpService.verifyOtp(otp, email);
  }

  async resetPassword(requestData) {
    const { otp, email, newPassword, confirmPassword } = requestData;
    await this.otpService.verifyOtp(otp, email);
    await this.otpService.deleteOtps(email);
    const user = await this.userService.resetPassword({
      email,
      newPassword,
      confirmPassword,
    });
    const accessToken = await this.createAccessToken(user._id);
    return { user, accessToken };
  }
}

module.exports = AuthService;
