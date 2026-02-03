# Frontend

React + Vite frontend with dark mode UI.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment variables

Create a `.env` file:

```
VITE_API_URL=https://your-backend.railway.app
```

Defaults to `http://localhost:8000` for local development.

## Vercel deployment

1. Connect GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add `VITE_API_URL` environment variable
4. Deploy
