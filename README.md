# Maverick Driver Data API

Collection of APIs for accessing Maverick Driver data.

## Routes

- `GET /` - basic text response
- `GET /status` - API health response

Example `/status` response:

```json
{
  "ok": true,
  "timestamp": "2026-04-17T18:35:20.355Z",
  "service": "maverick-driver-data-api"
}
```

## Scripts

- `npm run dev` - run with auto-reload using `tsx`
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run compiled app from `dist/index.js`
- `npm test` - run API tests with Vitest
- `npm run test:watch` - run Vitest in watch mode

## Local Run

```bash
npm install
npm run dev
```

Server listens on `http://localhost:3000` by default.
Set `PORT` to override.

## Deploy Notes

This project is deployment-ready for most Node hosts (Azure App Service, Render, Railway, Fly.io, etc.) using:

```bash
npm install
npm run build
npm start
```
