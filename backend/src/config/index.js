require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  api: {
    prefix: '/api/v1',
  },
};

module.exports = config;
