// Sets up Express app, middleware, and routes. Separated from server.js for easier testing and modularity.

const express = require('express');
const userRoutes = require('./routes/users.routes');
const apiLogger = require('./middlewares/apiLogger');

const app = express();

app.use(apiLogger);
app.use(express.json());
app.use('/api/users', userRoutes);

module.exports = app;