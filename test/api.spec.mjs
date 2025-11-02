import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';

// Create a REDIS_KEY for tests
const TEST_KEY = `visits_by_country_test_${Date.now()}`;
process.env.REDIS_KEY = TEST_KEY;
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6380';

const appModule = await import('../src/server.js');
const app = appModule.default || appModule;

const redisModule = await import('../src/config/redis.js');
const { redis } = redisModule.default || redisModule;

describe('Visits API', () => {
  beforeAll(async () => {
    // Make sure Redis is reachable
    await redis.ping();
  });

  beforeEach(async () => {
    // Clean the test hash before each test
    await redis.del(TEST_KEY);
  });

  afterAll(async () => {
    // Cleanup and close
    try {
      await redis.del(TEST_KEY);
      await redis.quit();
    } catch (_) {}
  });

  it('health returns { ok: true }', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('rejects invalid body (country must be 2 letters)', async () => {
    const bads = [{}, { country: '' }, { country: 'USA' }, { country: 42 }];
    for (const payload of bads) {
      const r = await request(app).post('/visits').send(payload);
      expect(r.status).toBe(400);
      expect(r.body.error).toBe('BadRequest');
    }
  });

  it('increments a country and normalizes to lowercase', async () => {
    const res = await request(app)
      .post('/visits')
      .send({ country: 'US' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.country).toBe('us');
    expect(typeof res.body.count).toBe('number');
    expect(res.body.count).toBe(1);
  });

  it('get stats returns a plain object with numeric values', async () => {
    await request(app).post('/visits').send({ country: 'us' });
    await request(app).post('/visits').send({ country: 'cy' });

    const res = await request(app).get('/visits');
    expect(res.status).toBe(200);
    expect(res.body).toBeTypeOf('object');

    for (const v of Object.values(res.body)) {
      expect(typeof v).toBe('number');
    }
  });

  it('multiple increments accumulate correctly', async () => {
    await request(app).post('/visits').send({ country: 'us' });
    await request(app).post('/visits').send({ country: 'us' });
    await request(app).post('/visits').send({ country: 'us' });

    const res = await request(app).get('/visits');
    expect(res.status).toBe(200);
    expect(res.body.us).toBe(3);
  });

  it('concurrent increments are atomic', async () => {
    const N = 20;
    await Promise.all(
      Array.from({ length: N }, () => request(app).post('/visits').send({ country: 'it' }))
    );
    const res = await request(app).get('/visits');
    expect(res.status).toBe(200);
    expect(res.body.it).toBe(N);
  });
});
