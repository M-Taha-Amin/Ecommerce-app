const BaseRepository = require('./baseRepository');

class OtpRepositotry extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getOneBy(filters) {
    return this.model.findOne(filters);
  }

  async deleteMany(filters) {
    return this.model.deleteMany(filters);
  }
}

module.exports = OtpRepositotry;
