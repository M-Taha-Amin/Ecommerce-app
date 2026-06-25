const BaseRepository = require('./baseRepository');

class ReviewRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getOne(filters = {}) {
    return this.model.findOne(filters);
  }
}

module.exports = ReviewRepository;
