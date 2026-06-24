const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getAll(adminId, options = {}) {
    const { excludeSelf = false } = options;
    if (excludeSelf === true) {
      return this.model.find({
        _id: { $ne: adminId },
      });
    }
    return this.model.find();
  }

  async getUserByEmail(userEmail, options = {}) {
    const { select } = options;
    let query = this.model.findOne({ email: userEmail });
    if (select) query = query.select(select);
    return query.exec();
  }

  async updatePassword(email, password) {
    const user = await this.getUserByEmail(email);
    user.password = password;
    await user.save();
    return user;
  }
}

module.exports = UserRepository;
