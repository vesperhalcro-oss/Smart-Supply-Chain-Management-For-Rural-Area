# RuralChain - Smart Supply Chain MVP

An offline-first MVP for connecting rural farmers, local transporters, micro-hubs, and urban markets.

## Features

- Responsive operations dashboard
- Offline-ready harvest form with browser `localStorage` queue
- Connection status and offline/online simulation
- Route bounty acceptance flow
- Shipment activity and hub telemetry views
- Analytics tab with hotspot and risk intelligence
- Parcel tracking with custody timeline, ETA, and condition score
- Updated project proposal with product mockups and rendered screens
- Zero-dependency Node.js static server
- Environment-driven port and application name

## Run locally

Requirements: Node.js 18+

```bash
npm start
```

Open <http://localhost:3000>. Edit `.env` to change the port or application name.

## Project structure

- `server.js` - dependency-free static server and `.env` loader
- `public/index.html` - application UI
- `public/styles.css` - responsive styling
- `public/app.js` - interactions and offline queue persistence
- `.env.example` - environment template
