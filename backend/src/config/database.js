const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  const uri = config.mongodb.uri;
  if (!uri) {
    throw new Error('MongoDB URI must not be undefined');
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log('📊 Database Connected successfully');
  } catch (error) {
    console.log('❌ Failed to Connect Database');
    process.exit(1);
  }
};

module.exports = connectDB;
