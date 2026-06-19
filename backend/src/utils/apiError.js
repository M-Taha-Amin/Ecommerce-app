class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
