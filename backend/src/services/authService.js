const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../utils/apiError');

class AuthService {
  constructor() {}

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
}

module.exports = AuthService;
