// logs/logger.js
const bunyan = require('bunyan');
const path = require('path');

const logger = bunyan.createLogger({
  name: 'node-crud-api',
  level: 'debug', // Use 'info' in production
  streams: [
    {
      level: 'debug',
      stream: process.stdout, // ✅ Console output
    },
    {
      level: 'info',
      path: path.join(__dirname, 'app.log'), // ✅ Log file
    },
  ],
  serializers: bunyan.stdSerializers,
});

module.exports = logger;
