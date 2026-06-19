const BaseRepository = require('./baseRepository');

class ProductRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

module.exports = ProductRepository;
