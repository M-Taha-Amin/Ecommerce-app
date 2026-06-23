const config = require('../config');

class EmailService {
  constructor(transporter) {
    this.transporter = transporter;
  }

  async sendEmail(userEmail, subject, message) {
    await this.transporter.sendMail({
      from: config.email.auth.adminEmailAddress,
      to: userEmail,
      subject: subject,
      text: message,
    });
  }
}

module.exports = EmailService;
