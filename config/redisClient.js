// redisClient.js
require('dotenv').config();
const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL  // Memurai default address
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  await client.connect();
  console.log('Connected to Redis');
}

module.exports = { client, connectRedis };