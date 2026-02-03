# 🗑️ Is My Startup Trash?

> The only startup validator honest enough to tell you the truth. No sugarcoating. No "circle back." Just brutal honesty.

![Verdict: Probably Trash](https://img.shields.io/badge/Your_Idea-Probably_Trash-ff6b6b?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/GPT--4-Powered-818cf8?style=for-the-badge)
![Competitors Found](https://img.shields.io/badge/Competitors-Found_Before_You-ffd93d?style=for-the-badge)

## 🔥 What This Does

Submit your startup idea → We search the web for competitors → GPT-4 delivers the verdict.

```json
POST /analyze-startup
{
  "name": "Uber for Dogs",
  "description": "On-demand dog walking app"
}
```

Returns:

```json
{
  "verdict": "trash",
  "roast": "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch. The only thing 'Uber for Dogs' is disrupting is my patience.",
  "competitors": ["Rover", "Wag", "Barkly", "PetBacker"],
  "score": 2.5,
  "name_rating": "🗑️ Peak 2015 Cringe - 'Uber for X' should be illegal",
  "advice": "Maybe focus on a specific niche like luxury pet services or pet medical transport?"
}
```

## 🎭 Hall of Shame (Example Roasts)

| Startup               | Verdict      | Score  | Roast                                                                                                                             |
| --------------------- | ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Uber for Dogs**     | 🗑️ TRASH     | 2.5/10 | "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch."                                           |
| **Netflix for Books** | 🗑️ TRASH     | 1.5/10 | "Congratulations, you've invented the public library. Except somehow worse because now there's a subscription fee."               |
| **AI Therapist**      | 🤔 POTENTIAL | 5.5/10 | "Oh great, another AI that wants to discuss my childhood trauma. At least it won't judge me for crying about my startup failing." |
| **Blockchain Voting** | 🗑️ TRASH     | 3.0/10 | "Nothing says 'I don't understand the problem' like proposing blockchain as a solution."                                          |

## ⚡ Quick Start

### Backend (Python/FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Set your OpenAI API key
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Run the server
uvicorn app.main:app --reload
```

API docs available at: http://localhost:8000/docs

### Frontend (React/Vite)

```bash
cd frontend

# Install dependencies
npm install

# Set API URL (optional for local development)
cp .env.example .env

# Run the dev server
npm run dev
```

Frontend available at: http://localhost:3000

## 🚀 Deployment

### Backend → Railway

1. Push to GitHub
2. Connect repo to [Railway](https://railway.app)
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!

Or click: [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

### Frontend → Vercel

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL` = your Railway URL
5. Deploy!

## 📡 API Endpoints

| Endpoint           | Method | Description                       |
| ------------------ | ------ | --------------------------------- |
| `/`                | GET    | Health check + welcome message    |
| `/health`          | GET    | Detailed health status            |
| `/analyze-startup` | POST   | 🔥 Analyze and roast your startup |
| `/examples`        | GET    | See example roasts                |
| `/docs`            | GET    | Swagger UI documentation          |

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, OpenAI GPT-4, DuckDuckGo Search
- **Frontend**: React, Vite, Vanilla CSS (with glassmorphism ✨)
- **Deployment**: Railway (backend), Vercel (frontend)

## 🎯 Features

- ✅ **Web Search** - Finds competitors before your investors do
- ✅ **GPT-4 Powered** - Maximum sarcasm, minimum sugarcoating
- ✅ **Name Analysis** - Tells you if your startup name is cringe
- ✅ **Score System** - 0-10 scale of "why did you quit your job for this"
- ✅ **Share Feature** - Share your roast on social media (for some reason)
- ✅ **Beautiful UI** - Dark mode, glassmorphism, animations

## 🤝 Contributing

Found a startup that's _even more_ trash? Want to add more savage roasts? PRs welcome!

```bash
git checkout -b feature/more-savage-roasts
# Make your changes
git commit -m "feat: added roast for crypto influencers"
git push origin feature/more-savage-roasts
```

## ⚠️ Disclaimer

This project is for entertainment purposes only. We are not responsible for:

- Crushed dreams
- Existential crises
- Pivots to crypto
- Angry LinkedIn posts
- "Well, actually..." comments from VCs
- Your decision to pursue an MBA instead

## 📜 License

MIT - Do whatever you want, we're too busy roasting startups to care.

---

<div align="center">

**Built with 🔥 and questionable life choices**

_If this roasted your idea, you probably needed to hear it._

[Try it live](https://is-my-startup-trash.vercel.app) • [API Docs](https://api.is-my-startup-trash.railway.app/docs)

</div>
