# 🗑️ Is My Startup Trash?

> The only startup validator honest enough to tell you the truth. No sugarcoating. No "circle back." Just brutal honesty.

![Verdict: Probably Trash](https://img.shields.io/badge/Verdict-Probably_Trash-red?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge)
![Competitors Found](https://img.shields.io/badge/Competitors-Found-orange?style=for-the-badge)

## What This Does

Submit your startup idea, we search the web for competitors, GPT-4 delivers the verdict.

```
POST /analyze-startup
{
  "name": "Uber for Dogs",
  "description": "On-demand dog walking app"
}
```

Response:

```json
{
  "verdict": "trash",
  "roast": "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch.",
  "competitors": ["Rover", "Wag", "Barkly", "PetBacker"],
  "score": 2.5,
  "name_rating": "Peak 2015 cringe - 'Uber for X' should be illegal",
  "advice": "Maybe focus on a specific niche like luxury pet services or pet medical transport?"
}
```

## Hall of Shame

| Startup               | Verdict   | Score  | Roast                                                                                          |
| --------------------- | --------- | ------ | ---------------------------------------------------------------------------------------------- |
| **Uber for Dogs**     | TRASH     | 2.5/10 | "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch."        |
| **Netflix for Books** | TRASH     | 1.5/10 | "Congratulations, you've invented the public library. Except somehow worse."                   |
| **AI Therapist**      | POTENTIAL | 5.5/10 | "Another AI that wants to discuss my childhood trauma. At least it won't judge me for crying." |
| **Blockchain Voting** | TRASH     | 3.0/10 | "Nothing says 'I don't understand the problem' like proposing blockchain as a solution."       |

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Add your OPENROUTER_API_KEY

uvicorn app.main:app --reload --loop asyncio
```

API docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000

## Deployment

### Backend (Railway)

1. Push to GitHub
2. Connect to [Railway](https://railway.app)
3. Add `OPENROUTER_API_KEY` env variable
4. Deploy

### Frontend (Vercel)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add `VITE_API_URL` pointing to your Railway URL
5. Deploy

## API Endpoints

| Endpoint           | Method | Description               |
| ------------------ | ------ | ------------------------- |
| `/`                | GET    | Health check              |
| `/health`          | GET    | Detailed health status    |
| `/analyze-startup` | POST   | Analyze and roast startup |
| `/examples`        | GET    | Example roasts            |
| `/docs`            | GET    | Swagger docs              |

## Tech Stack

- **Backend**: Python, FastAPI, OpenRouter (GPT-4o-mini), DuckDuckGo Search
- **Frontend**: React, Vite, CSS with glassmorphism
- **Hosting**: Railway (backend), Vercel (frontend)

## Contributing

Found a startup that's _even more_ trash? Want to add more savage roasts? PRs welcome.

```bash
git checkout -b feature/more-savage-roasts
git commit -m "feat: added roast for crypto influencers"
git push origin feature/more-savage-roasts
```

## Disclaimer

This project is for entertainment purposes only. We are not responsible for:

- Crushed dreams
- Existential crises
- Pivots to crypto
- Angry LinkedIn posts
- "Well, actually..." comments from VCs
- Your decision to pursue an MBA instead

## License

MIT - Do whatever you want, we're too busy roasting startups to care.

---

<div align="center">

**Built with questionable life choices**

_If this roasted your idea, you probably needed to hear it._

[Try it live](https://is-my-startup-trash.vercel.app) • [API Docs](https://api.is-my-startup-trash.railway.app/docs)

</div>
