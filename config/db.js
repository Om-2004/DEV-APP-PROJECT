const mongoose = require('mongoose');
const config = require('config'); // ✅ Load config package

const db = config.get('MONGOURL'); // ✅ Reads from default.json or production.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
