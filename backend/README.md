# 🗑️ Is My Startup Trash? - Backend API

FastAPI backend for the Startup Roaster. Powered by GPT-4o-mini via OpenRouter and web search.

## Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set your OpenRouter API key (get one at https://openrouter.ai/keys)
cp .env.example .env
# Edit .env with your key

# Run the server
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `POST /analyze-startup` - Analyze and roast a startup idea
- `GET /examples` - Get example roasts
- `GET /docs` - Swagger UI

## Environment Variables

| Variable             | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| `OPENROUTER_API_KEY` | Your OpenRouter API key (get one at [openrouter.ai/keys](https://openrouter.ai/keys)) |
| `PORT`               | Server port (default: 8000)                                                           |

## Cost

Using **GPT-4o-mini via OpenRouter**: ~$0.0003 per roast (~3,333 roasts per $1)

## Deployment to Railway

1. Connect your GitHub repo to Railway
2. Set `OPENROUTER_API_KEY` in environment variables
3. Railway will auto-detect Python and deploy

The `railway.json` and `Procfile` are already configured.
