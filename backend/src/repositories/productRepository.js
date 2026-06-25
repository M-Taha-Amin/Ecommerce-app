const BaseRepository = require('./baseRepository');

class ProductRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getAll(options) {
    const filters = {};
    const { name, category, price_lte, price_gte, limit, skip } = options;

    if (options.name) {
      filters.name = {
        $regex: new RegExp(options.name, 'i'),
      };
    }
    if (price_lte || price_gte) filters.price = {};
    if (category) filters.category = category;
    if (price_lte) filters.price.$lte = price_lte;
    if (price_gte) filters.price.$gte = price_gte;

    // limit and skip will always exist, validation provides defaults if they don't
    return await this.model.find(filters).limit(limit).skip(skip);
  }
}

module.exports = ProductRepository;
