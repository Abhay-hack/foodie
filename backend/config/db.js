// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔗 MONGO_URI:', process.env.MONGO_URI);

const connectDB = async () => {
  try {
    console.log('🔗 MONGO_URI:', process.env.MONGO_URI); // debug
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
