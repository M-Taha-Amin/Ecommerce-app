const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product Name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product Price is required'],
    maxLength: [8, 'Product Price cannot be more than 8 digits'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Product Category is required'],
  },
  stock: {
    type: Number,
    default: 1,
    maxLength: [4, 'Product Stock cannot be more than 4 digits'],
  },
  adminId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  ratingSum: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
