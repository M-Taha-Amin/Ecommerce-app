class ApiResponse {
  static generic = (res, statusCode, message, success, payload) => {
    const response = { success, message };
    if (payload !== undefined) response.payload = payload;
    return res.status(statusCode).json(response);
  };

  static success = (res, message, payload = {}) => {
    return this.generic(res, 200, message, true, payload);
  };

  static created = (res, message, payload) => {
    return this.generic(res, 201, message, true, payload);
  };

  static noContent = (res, message) => {
    return this.generic(res, 204, message, true);
  };
}

module.exports = ApiResponse;
