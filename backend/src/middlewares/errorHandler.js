function errorHandler(err, req, res, next) {
  return res.status(err.statusCode ? err.statusCode : 500).json({
    success: false,
    message: err.message,
  });
}

module.exports = errorHandler;
