class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return this.model.find();
  }

  async getOne(id) {
    return this.model.findById(id);
  }

  async insert(modelData) {
    const modelInstance = new this.model(modelData);
    await modelInstance.save();
    return modelInstance;
  }

  async update(id, updatedData) {
    return this.model.findByIdAndUpdate(id, updatedData, {
      returnDocument: 'after'
    });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
