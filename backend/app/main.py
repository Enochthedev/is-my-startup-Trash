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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
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
    
    # Check for example matches first (for demos/testing)
    name_lower = startup.name.lower()
    for key, example in EXAMPLE_ROASTS.items():
        if key in name_lower:
            return StartupAnalysis(**example)
    
    # Use the AI roaster if available
    if roaster:
        try:
            return roaster.analyze_startup(startup.name, startup.description)
        except Exception as e:
            print(f"Roaster error: {e}")
            raise HTTPException(
                status_code=500,
                detail="Our AI is having a breakdown. Even it couldn't handle your startup idea."
            )
    else:
        # Demo mode fallback
        return StartupAnalysis(
            verdict="potential",
            roast=f"'{startup.name}' sounds like something a VC would pretend to understand. We're running in demo mode, so we can't fully roast you yet. Configure your OpenRouter API key for the full experience.",
            competitors=["Demo Mode Inc.", "Configure Your API Key LLC"],
            score=5.0,
            name_rating="🤖 Demo Mode - Cannot fully judge your naming choices",
            advice="Set up the OPENROUTER_API_KEY to unlock our full roasting potential"
        )


@app.get("/examples", tags=["Examples"])
async def get_examples():
    """Get example startup roasts for inspiration (or warning)."""
    return {
        "examples": [
            {
                "input": {"name": "Uber for Dogs", "description": "On-demand dog walking"},
                "output": EXAMPLE_ROASTS["uber for dogs"]
            },
            {
                "input": {"name": "Netflix for Books", "description": "Subscription book service"},
                "output": EXAMPLE_ROASTS["netflix for books"]
            },
            {
                "input": {"name": "AI Therapist", "description": "Mental health chatbot"},
                "output": EXAMPLE_ROASTS["ai therapist"]
            }
        ],
        "disclaimer": "These are just examples. Your actual roast may be even more savage."
    }
