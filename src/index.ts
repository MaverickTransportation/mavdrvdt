import { serve } from '@hono/node-server';
import { app } from './app.js';

const port = Number(process.env.PORT ?? 3000);

serve({
  fetch: app.fetch,
  port,
  hostname: process.env.HOSTNAME ?? 'localhost'
}, () => {
  console.log(`API listening on http://${process.env.HOSTNAME ?? 'localhost'}:${port}`);
});
