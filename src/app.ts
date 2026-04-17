import { Hono } from 'hono';

export const app = new Hono();

app.get('/status', (c) => {
  return c.json({
    performance: 'optimal',
    services: [
        {'home-location': 'operational'},
        {'trip-history': 'operational'},
        {'vehicle-data': 'operational'}
    ],
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (c) => {
  return c.text('Maverick Driver Data API is running. Check /status');
});
