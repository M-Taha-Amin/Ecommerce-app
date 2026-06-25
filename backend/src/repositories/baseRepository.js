class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll(filters = {}) {
    return this.model.find(filters);
  }

  async getOne(id) {
    return this.model.findById(id);
  }

  async count(filters = {}) {
    return this.model.countDocuments(filters);
  }

  async insert(modelData) {
    const modelInstance = new this.model(modelData);
    await modelInstance.save();
    return modelInstance;
  }

  async update(id, updatedData) {
    return this.model.findByIdAndUpdate(id, updatedData, {
      returnDocument: 'after',
    });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async deleteMany(filters = {}) {
    return this.model.deleteMany(filters);
  }
}

module.exports = BaseRepository;
