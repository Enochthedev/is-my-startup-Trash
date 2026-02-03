# Backend API

FastAPI backend for the startup roaster. Uses GPT-4o-mini via OpenRouter for analysis and DuckDuckGo for competitor search.

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Add your OPENROUTER_API_KEY (get one at https://openrouter.ai/keys)

uvicorn app.main:app --reload --loop asyncio
```

## Endpoints

- `GET /` - Health check
- `GET /health` - Detailed status
- `POST /analyze-startup` - Analyze a startup idea
- `GET /examples` - Example roasts
- `GET /docs` - Swagger UI

## Environment variables

| Variable             | Description                 |
| -------------------- | --------------------------- |
| `OPENROUTER_API_KEY` | API key from openrouter.ai  |
| `PORT`               | Server port (default: 8000) |

## Cost

GPT-4o-mini via OpenRouter costs roughly $0.0003 per request.

## Railway deployment

1. Connect GitHub repo to Railway
2. Set `OPENROUTER_API_KEY` in environment variables
3. Deploy

The `railway.json` and `Procfile` are already configured.
