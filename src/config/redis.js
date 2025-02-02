const Redis = require('ioredis');
require('dotenv').config();

// Set up Upstash Redis connection
const redisClient = new Redis({
  host: process.env.UPSTASH_REDIS_URL,
  port: 6379,
  password: process.env.UPSTASH_REDIS_PASSWORD,
  tls: {} // TLS is required for Upstash Redis
});

redisClient.on('connect', () => {
  console.log('Connected to Upstash Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;
