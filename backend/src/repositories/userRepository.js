const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getUserByEmail(userEmail, options = {}) {
    const { select } = options;
    let query = this.model.findOne({ email: userEmail });
    if (select) query = query.select(select);
    return query.exec();
  }
}

module.exports = UserRepository;
