const bcrypt = require('bcryptjs');
const ApiError = require('../utils/apiError');

class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async createUser(userData) {
    const existingUser = await this.repository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new ApiError('User Account Already Exists', 409);
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    let newUser = await this.repository.insert(userData);
    newUser = newUser.toObject();
    delete newUser.password;
    return newUser;
  }

  async verifyCredentials(currentUser) {
    const existingUser = await this.verifyEmailExists(currentUser.email);

    const validPassword = await bcrypt.compare(
      currentUser.password,
      existingUser.password,
    );

    if (!validPassword) {
      throw new ApiError('Invalid Email or Password', 401);
    }

    return existingUser;
  }

  async getUserById(userId) {
    return this.repository.getOne(userId);
  }

  async verifyEmailExists(email) {
    const user = await this.repository.getUserByEmail(email, {
      select: '+password',
    });
    if (!user) {
      throw new ApiError('Invalid Email or Password', 401);
    }
    return user;
  }

  async resetPassword(userData) {
    const { email, newPassword, confirmPassword } = userData;
    if (newPassword !== confirmPassword) {
      throw new ApiError('Passwords do not match', 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.repository.updatePassword(email, hashedPassword);
  }
}

module.exports = UserService;
