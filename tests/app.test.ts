import { describe, expect, it } from 'vitest';

import { app } from '../src/app.js';

describe('Hono API routes', () => {
  it('GET / returns a helpful message', async () => {
    const res = await app.request('/');

    expect(res.status).toBe(200);
    await expect(res.text()).resolves.toBe('Maverick Driver Data API is running. Check /status');
  });

  it('GET /status returns service health data', async () => {
    const res = await app.request('/status');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.performance).toBe('optimal');
    expect(Array.isArray(body.services)).toBe(true);
    expect(body.services).toEqual([
      {'home-location': 'operational'},
      {'trip-history': 'operational'},
      {'vehicle-data': 'operational'}
    ]);
    expect(typeof body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });
});
