import request from 'supertest';
import app from '../src/app.js';

describe('GET /health', () => {
  it('returns a healthy service response', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe('ok');
    expect(response.body.message).toBe('Service healthy');
  });
});
