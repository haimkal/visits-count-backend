const Redis = require('ioredis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6380';
const REDIS_KEY = process.env.REDIS_KEY || 'visits_by_country';

const redis = new Redis(REDIS_URL, { lazyConnect: true });

async function ensureRedis() {
  if (!redis.status || redis.status === 'end') await redis.connect();
}

module.exports = { redis, ensureRedis, REDIS_KEY };
