const mongoose = require('mongoose');
const config = require('config');

const db = process.env.MONGO_URL || config.get('MONGOURL'); // ✅ Environment override support

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
