Meteor Madness
==============

## Local development

Backend:
```bash
cd Backend
npm install
NASA_API_KEY=your_key npm start
```

Frontend:
```bash
cd Frontend
npm install
npm run dev
```

## Environment variables

Create a `.env` (not committed) in `Backend/`:
```
NASA_API_KEY=your_key
```

Frontend expects `VITE_API_BASE_URL` pointing at the backend (see deployment).

## Deployment (free-tier friendly)

1. Host backend on Render/Railway:
   - Root: `Backend`
   - Build: `npm install`
   - Start: `npm start`
   - Env vars: set `NASA_API_KEY`
2. Deploy frontend on Vercel:
   - Add env `VITE_API_BASE_URL=https://<backend-host>`
   - Redeploy so API calls hit the hosted backend.
