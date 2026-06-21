const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default: 'default id',
    },
    url: {
      type: String,
      default: 'default url',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
