# NASA SPACE APPS CHALLANGE
## Question chosen: Meteor Madness

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

Frontend expects `VITE_API_BASE_URL` and `VITE_CESIUM_TOKEN` pointing at the backend (see deployment).

## Deployment (free-tier friendly)

1. Host backend on Render:
   - Root: `Backend`
   - Build: `npm install`
   - Start: `npm start`
   - Env vars: set `NASA_API_KEY`
2. Deploy frontend on Vercel:
   - Add env `VITE_API_BASE_URL` and `VITE_CESIUM_TOKEN`
   - Redeploy so API calls hit the hosted backend.

## 👥 Contributors

This project was built collaboratively with:

- [darksunnp](https://github.com/darksunnp)
- [thestuti](https://github.com/thestuti)
- [Gun4shot](https://github.com/Gun4shot)
- [gausele](https://github.com/gausele)
- [fianko-codes](https://github.com/fianko-codes)
