import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .models import StartupInput, StartupAnalysis, HealthResponse
from .roaster import StartupRoaster, EXAMPLE_ROASTS

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="🗑️ Is My Startup Trash?",
    description="""
## The Only Startup Advisor Honest Enough to Tell You the Truth

Tired of yes-men VCs who ghost you after saying "interesting"? 
We'll tell you if your startup is trash in seconds.

### Features:
- 🔍 **Web Search** - We find your competitors before your investors do
- 🤖 **GPT-4 Powered** - Maximum sarcasm, minimum sugarcoating  
- 📊 **Honest Scores** - 0-10 scale of "why did you quit your job for this"
- 💡 **Secret Advice** - We're harsh but actually want you to succeed

### Verdict Types:
- **🗑️ Trash** - Sorry, this has been done (or shouldn't be done)
- **🤔 Potential** - Has issues, but might work with pivots
- **✨ Gold** - Actually innovative (rare, but it happens)

*Built by founders who've heard enough "Uber for X" pitches to last a lifetime.*
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend
# CORS middleware for frontend
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize roaster
openrouter_key = os.getenv("OPENROUTER_API_KEY")
roaster = None
if openrouter_key:
    roaster = StartupRoaster(openrouter_key)


@app.get("/", response_model=HealthResponse, tags=["Health"])
async def root():
    """Health check and welcome message."""
    return HealthResponse(
        status="healthy",
        message="Ready to crush your startup dreams 🔥",
        version="1.0.0"
    )


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Detailed health check."""
    return HealthResponse(
        status="healthy" if roaster else "degraded",
        message="AI roaster ready" if roaster else "Running without OpenRouter (demo mode)",
        version="1.0.0"
    )


@app.post("/analyze-startup", response_model=StartupAnalysis, tags=["Roast"])
async def analyze_startup(startup: StartupInput):
    """
    🔥 Analyze your startup idea and get brutally honest feedback.
    
    We'll search the web for competitors, rate your name, and deliver
    a verdict that might hurt (but you need to hear it).
    
    **Example request:**
    ```json
    {
        "name": "Uber for Dogs",
        "description": "On-demand dog walking app that connects pet owners with walkers"
    }
    ```
    
    **Possible verdicts:**
    - `trash` - Sorry, this idea belongs in the bin
    - `potential` - Has issues, but might work
    - `gold` - Actually innovative (rare!)
    """
    
    # Use the AI roaster if available
    if roaster:
        try:
            return await roaster.analyze_startup(startup.name, startup.description)
        except Exception as e:
            print(f"Roaster error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Our AI is having a breakdown. Even it couldn't handle your startup idea."
            )
    else:
        # Demo mode - return random example
        import random
        example = random.choice(EXAMPLE_ROASTS)
        return StartupAnalysis(
            verdict=example["verdict"],
            roast=f"[Demo Mode] {example['roast']}",
            competitors=example["competitors"],
            score=example["score"],
            name_rating=example["name_rating"],
            advice=example["advice"],
            market_size=example.get("market_size"),
            originality_score=example.get("originality_score"),
            execution_difficulty=example.get("execution_difficulty")
        )


@app.get("/random-example", tags=["Examples"])
async def get_random_example():
    """Get a random example to try - each click gives a different startup idea."""
    import random
    example = random.choice(EXAMPLE_ROASTS)
    return {
        "name": example["name"],
        "description": example["description"]
    }


@app.get("/examples", tags=["Examples"])
async def get_examples():
    """Get all example startup roasts for inspiration (or warning)."""
    import random
    # Return 3 random examples each time
    selected = random.sample(EXAMPLE_ROASTS, min(3, len(EXAMPLE_ROASTS)))
    return {
        "examples": [
            {
                "input": {"name": ex["name"], "description": ex["description"]},
                "output": {k: v for k, v in ex.items() if k not in ["name", "description"]}
            }
            for ex in selected
        ],
        "total_examples": len(EXAMPLE_ROASTS),
        "disclaimer": "These are just examples. Your actual roast will be unique."
    }

