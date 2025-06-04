const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGOURL'); // make sure MONGOURL is defined in config/default.json

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected successfully...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
