const mongoose = require('mongoose');

const connectDB = async () => {
    // connect mongodb at default port 27017
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {

        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // exit process with failure
    }
};

module.exports = connectDB;