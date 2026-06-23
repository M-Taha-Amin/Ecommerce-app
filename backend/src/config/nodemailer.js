const nodemailer = require('nodemailer');
const config = require('./index');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.auth.adminEmailAddress,
    pass: config.email.auth.password,
  },
});

module.exports = transporter;
