const mongoose = require("mongoose");

async function connectMongoDB(url) {
    try {
        const connection = await mongoose.connect(url);
        console.log(`MongoDB connected to ${connection.connection.host}`);
        return connection;
    }
    catch (err) {
        console.error("MongoDB connection failed: ", err.message);
        process.exit(1);
    }
}

module.exports = {  
    connectMongoDB
};