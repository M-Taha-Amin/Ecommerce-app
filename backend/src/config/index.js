require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  api: {
    prefix: '/api/v1',
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    options: {
      expiresIn: '7d',
    },
  },
  authCookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d in ms, matches jwt expiry
  },
};

module.exports = config;
