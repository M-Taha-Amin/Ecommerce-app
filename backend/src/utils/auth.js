const config = require('../config');

exports.setAuthCookie = function (res, access_token) {
  res.cookie('access_token', access_token, {
    maxAge: config.authCookie.maxAge,
    httpOnly: true,
  });
  return;
};

exports.clearAuthCookie = function (res) {
  res.clearCookie('access_token', {
    httpOnly: true,
  });
  return;
};
