const logger = require('../logs/logger');

function apiLogger(req, res, next) {
  logger.info({
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
  }, '📥 Incoming API request');
  next();
}

module.exports = apiLogger;