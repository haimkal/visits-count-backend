const { redis, ensureRedis, REDIS_KEY } = require('../config/redis');

async function incrementCountry(country) {
  await ensureRedis();
  const countryName = String(country).toLowerCase();
  const count = await redis.hincrby(REDIS_KEY, countryName, 1);
  return { country: countryName, count: Number(count) };
}

async function getAllStats() {
  await ensureRedis();
  const raw = await redis.hgetall(REDIS_KEY);
  return Object.fromEntries(Object.entries(raw).map(([key, val]) => [key, Number(val)])); // reutrning val from type number
}

module.exports = { incrementCountry, getAllStats };
