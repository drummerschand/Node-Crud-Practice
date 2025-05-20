// Entry point of the app – loads environment variables, connects to MongoDB, and starts the server.

require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/mongo.js");
const { connectRedis } = require("./config/redisClient");

connectDB(); // connectes to the mongo DB

const PORT = process.env.PORT ? process.env.PORT : 5000;

// Connect Redis before starting server
connectRedis().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
