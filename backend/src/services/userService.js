const bcrypt = require('bcryptjs');
const ApiError = require('../utils/apiError');

class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }

  async getAllUsers(adminId, options) {
    return this.repository.getAll(adminId, options);
  }

  async getUser(userId) {
    const user = await this.repository.getOne(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
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
    let existingUser = await this.verifyEmailExists(currentUser.email);

    const validPassword = await bcrypt.compare(
      currentUser.password,
      existingUser.password,
    );

    if (!validPassword) {
      throw new ApiError('Invalid Email or Password', 401);
    }
    existingUser = existingUser.toObject();
    delete existingUser.password;
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

  async updatePassword(userEmail, requestData) {
    const { oldPassword, newPassword, confirmPassword } = requestData;

    const existingUser = await this.repository.getUserByEmail(userEmail, {
      select: '+password',
    });

    const validPassword = await bcrypt.compare(
      oldPassword,
      existingUser.password,
    );

    if (!validPassword) {
      throw new ApiError('Current Password is incorrect', 400);
    }

    if (newPassword !== confirmPassword) {
      throw new ApiError('Passwords do not match', 400);
    }

    if (newPassword === oldPassword) {
      throw new ApiError(
        'New Password cannot be the same as Current Password',
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.repository.updatePassword(userEmail, hashedPassword);
  }

  async updateProfile(userId, requestData) {
    return this.repository.update(userId, requestData);
  }

  async updateRole(userId, requestData) {
    return this.repository.update(userId, requestData);
  }

  async deleteUser(userId) {
    const deleted = await this.repository.delete(userId);
    if (deleted === null) {
      throw new ApiError('User not found', 404);
    }
    return deleted;
  }
}

module.exports = UserService;
