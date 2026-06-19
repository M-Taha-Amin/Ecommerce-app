class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    return this.model.find();
  };

  getOne = async id => {
    return this.model.findById(id);
  };

  insert = async modelData => {
    const modelInstance = new this.model(modelData);
    await modelInstance.save();
    return modelInstance;
  };

  update = async (id, updatedData) => {
    return this.model.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  };

  delete = async id => {
    return this.model.findByIdAndDelete(id);
  };
}

module.exports = BaseRepository;
