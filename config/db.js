const mongoose = require('mongoose');
require('dotenv').config(); 

const db = process.env.MONGOURL;

const connectDB = async () => {
    try {
        await mongoose.connect(db); // Clean and updated
        console.log('MongoDB connected successfully...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
