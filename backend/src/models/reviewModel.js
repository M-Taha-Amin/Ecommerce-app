const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User Id is required'],
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Product Id is required'],
  },
  username: {
    type: String,
    require: [true, 'User name is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
  },
  comment: {
    type: String,
    required: [true, 'Review Comment is required'],
  },
});

module.exports = mongoose.model('Review', reviewSchema);
