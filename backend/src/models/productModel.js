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
  num_of_reviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  // the admin who added this product
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
