const mongoose = require('mongoose');

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL || 'mongodb://localhost:27017/myapp');
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDB }
