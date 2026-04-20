import { Hono } from 'hono';
import mapepire from '@ibm/mapepire-js';

import type { DaemonServer } from '@ibm/mapepire-js';
import type { DriverLocation } from './interfaces/DriverLocation.ts';

export const app = new Hono();
const { HOST, ID, PW, LIB1, FILE1, LIB2, FILE2 } = process.env;

app.get('/api/v1', async(c) => {
  return c.text('Maverick Driver Data API is running. Check /api/v1/status');
});

app.get('/api/v1/status', async (c) => {
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

app.get('/api/v1/pdp/', async (c) => {
  try {
    const creds: DaemonServer = {
      host: HOST!,
      user: ID!,
      password: PW!,
      rejectUnauthorized: false,
    };
    const job = new mapepire.SQLJob();
    await job.connect(creds);
    const query = job.query<DriverLocation>(
      `SELECT d.DRCODE AS "externalId", d.DRADD AS "address", d.DRCITY AS "addressCity", d.DRST AS "addressState", d.DRZIP AS "adressZipCode", round((h.HDLA1 / 3600), 4) AS "latitude", round((h.HDLO1 / -3600), 4) AS "longitutue" FROM ${LIB1}.${FILE1} d LEFT JOIN ${LIB2}.${FILE2} h ON d.DRCODE = h.HDDRVR WHERE TRIM(d.DRDLT) != 'D' ORDER BY d.DRCODE ASC`,
    );
    let result = await query.execute();
    let allResults: DriverLocation[] = [...result.data];
    while (!result.is_done) {
      result = await query.fetchMore();
      allResults.push(...result.data);
    }
    c.status(200);
    return c.json({ data: allResults });
  } catch (error) {
    c.status(500);
    console.error('Error occurred:', error);
    return c.json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});