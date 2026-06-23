const ApiError = require('../utils/apiError');
const { randomIntInRange } = require('../utils/numbers');

class OtpService {
  constructor(otpRepository) {
    this.repository = otpRepository;
  }

  async generateAndSaveOtp(email) {
    const otp = String(randomIntInRange(100000, 999999));
    await this.repository.insert({ otp, email });
    return otp;
  }

  async verifyOtp(otp, email) {
    const otpRecord = await this.repository.getOneBy({ otp, email });

    if (!otpRecord) {
      throw new ApiError('Invalid or Expired OTP', 401);
    }

    // otp expiry default is 10min, so we add 10min in ms to the time when otp was created, we need this to check if otp has expired
    const otpExpiry = otpRecord.created_at.getTime() + 10 * 60 * 1000;
    const currentTime = Date.now();

    if (currentTime > otpExpiry) {
      throw new ApiError('Expired OTP', 401);
    }
  }

  async deleteOtps(email) {
    await this.repository.deleteMany({ email });
  }
}

module.exports = OtpService;
