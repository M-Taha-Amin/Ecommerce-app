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
    const existingUser = await this.repository.getUserByEmail(
      currentUser.email,
      {
        select: '+password',
      },
    );

    if (!existingUser) {
      throw new ApiError('Unauthorized', 401);
    }

    const validPassword = await bcrypt.compare(
      currentUser.password,
      existingUser.password,
    );

    if (!validPassword) {
      throw new ApiError('Unauthorized', 401);
    }

    return existingUser;
  }

  async getUserById(userId) {
    return this.repository.getOne(userId);
  }
}

module.exports = UserService;
