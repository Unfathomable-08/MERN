const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 60000,  // Increase timeout to 60 seconds
            socketTimeoutMS: 60000,           // Increase socket timeout
            connectTimeoutMS: 60000,          // Increase connection timeout
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};


module.exports = connectDB;
