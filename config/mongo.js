const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MogoDB Connected successfully");
    } catch (error) {
        console.error("MogoDB Connection failed ->", error.message);
        process.exit(1);
    }
};

module.exports = connectDB
