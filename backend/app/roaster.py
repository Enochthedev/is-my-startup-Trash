import json
import re
from typing import List, Tuple
from openai import OpenAI
import nest_asyncio

# Monkeypatch nest_asyncio to prevent crash with uvloop
# duckduckgo_search calls nest_asyncio.apply() at module level
original_apply = nest_asyncio.apply
def safe_apply(loop=None):
    try:
        original_apply(loop)
    except ValueError:
        # Ignore "Can't patch loop of type ..." error from uvloop
        pass
nest_asyncio.apply = safe_apply

from duckduckgo_search import DDGS
from .models import StartupAnalysis


class StartupRoaster:
    """The Startup Roaster - crushing dreams since 2024."""
    
    def __init__(self, openrouter_api_key: str):
        # Using OpenRouter for cheaper model access
        self.client = OpenAI(
            api_key=openrouter_api_key,
            base_url="https://openrouter.ai/api/v1"
        )
        self.ddgs = DDGS()
    
    def search_competitors(self, name: str, description: str) -> Tuple[List[str], str]:
        """Search the web for existing competitors."""
        try:
            # Search for similar startups/apps
            search_query = f"{description} app startup competitors"
            results = list(self.ddgs.text(search_query, max_results=10))
            
            # Also search for the specific concept
            concept_query = f"{name} similar apps alternatives"
            concept_results = list(self.ddgs.text(concept_query, max_results=5))
            
            all_results = results + concept_results
            
            # Format search results for context
            search_context = "\n".join([
                f"- {r.get('title', 'N/A')}: {r.get('body', 'N/A')[:200]}"
                for r in all_results
            ])
            
            return all_results, search_context
        except Exception as e:
            print(f"Search error: {e}")
            return [], "No search results available"
    
    def analyze_startup(self, name: str, description: str) -> StartupAnalysis:
        """Analyze and roast a startup idea."""
        
        # First, search for competitors
        search_results, search_context = self.search_competitors(name, description)
        
        # Build the prompt
        system_prompt = """You are a brutally honest startup analyst who combines sharp wit with genuine market expertise. 
You've analyzed thousands of startups, survived the dot-com bubble, watched WeWork implode, and have zero patience for derivative ideas.

Your analysis must be:
1. Brutally honest - No sugarcoating, tell them the truth
2. Genuinely funny - Use clever wit, not just insults
3. Data-driven - Reference real competitors and market dynamics
4. Actually helpful - Give actionable insights behind the humor

You must respond with valid JSON matching this exact structure:
{
    "verdict": "trash" | "potential" | "gold",
    "roast": "Your brutally honest and clever assessment (2-4 sentences, be creative and unique)",
    "competitors": ["Real", "competitors", "from", "search", "results"],
    "score": 0.0 to 10.0,
    "name_rating": "Concise rating of the startup name",
    "advice": "Genuine strategic advice for improvement",
    "market_size": "Assessment like 'Saturated - $X market with Y players' or 'Emerging - $X potential'",
    "originality_score": 0.0 to 10.0,
    "execution_difficulty": "Low/Medium/High - Brief explanation"
}

Scoring guide:
- 0-3: Trash - Oversaturated, fundamentally flawed, or already exists
- 4-6: Potential - Has issues but could work with significant pivots
- 7-10: Gold - Genuinely innovative or underserved market

Name rating guide (no emojis, keep it professional):
- "Cringe - Overused naming pattern"
- "Forgettable - Won't stick in anyone's mind"
- "Solid - Memorable and brandable"
- "Excellent - Unique and marketable"

Be creative with your roasts - every response should feel fresh and unique."""

        user_prompt = f"""Analyze this startup idea:

**Startup Name:** {name}
**Description:** {description}

**Web Search Results (existing competitors/similar products):**
{search_context}

Based on the search results and your startup wisdom, deliver your verdict. 
Extract actual competitor names from the search results if found.
Remember: Be brutally honest, genuinely funny, and secretly helpful."""

        try:
            response = self.client.chat.completions.create(
                model="openai/gpt-4o-mini",  # Via OpenRouter - super cheap!
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=1.2,  # High creativity - every roast is unique!
                top_p=0.95,       # Diverse word choices
                max_tokens=1000,
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            
            # Validate and return with all metrics
            return StartupAnalysis(
                verdict=result.get("verdict", "trash"),
                roast=result.get("roast", "Our AI is speechless. That's either really good or really bad."),
                competitors=result.get("competitors", [])[:10],
                score=min(10, max(0, float(result.get("score", 5)))),
                name_rating=result.get("name_rating", "Undetermined"),
                advice=result.get("advice"),
                market_size=result.get("market_size"),
                originality_score=min(10, max(0, float(result.get("originality_score", 5)))) if result.get("originality_score") else None,
                execution_difficulty=result.get("execution_difficulty")
            )
            
        except Exception as e:
            print(f"OpenAI error: {e}")
            # Fallback response
            return StartupAnalysis(
                verdict="potential",
                roast="Our AI is having an existential crisis trying to process your idea. That's... something?",
                competitors=[],
                score=5.0,
                name_rating="Error - Even AI couldn't handle this",
                advice="Try again when our servers recover from your pitch",
                market_size="Unknown - Analysis failed",
                originality_score=5.0,
                execution_difficulty="Unknown"
            )


# Pre-built example roasts for demo/fallback - expanded list
EXAMPLE_ROASTS = [
    {
        "name": "Uber for Dogs",
        "description": "On-demand dog walking service",
        "verdict": "trash",
        "roast": "There are literally 47 dog walking apps fighting for the same suburban moms. The only thing 'Uber for Dogs' is disrupting is my patience for unoriginal pitch decks.",
        "competitors": ["Rover", "Wag", "Barkly", "PetBacker", "Care.com"],
        "score": 2.5,
        "name_rating": "Cringe - 'Uber for X' naming died in 2015",
        "advice": "Consider a specific niche like luxury pet concierge or pet medical transport instead.",
        "market_size": "Saturated - $1.2B market with 50+ established players",
        "originality_score": 1.5,
        "execution_difficulty": "Medium - Standard two-sided marketplace"
    },
    {
        "name": "Netflix for Books",
        "description": "Unlimited ebook subscription service",
        "verdict": "trash",
        "roast": "Congratulations, you've invented the public library. Except somehow worse because now there's a monthly fee and worse selection.",
        "competitors": ["Kindle Unlimited", "Audible", "Scribd", "Kobo Plus", "Libraries"],
        "score": 1.5,
        "name_rating": "Forgettable - Sounds like every other 'X for Y' pitch",
        "advice": "This literally exists in multiple forms. Find a genuine gap instead of repackaging.",
        "market_size": "Dominated - Amazon owns 80% of this space",
        "originality_score": 0.5,
        "execution_difficulty": "High - Publisher licensing is a nightmare"
    },
    {
        "name": "AI Therapist",
        "description": "Mental health chatbot powered by AI",
        "verdict": "potential",
        "roast": "Another AI that wants to discuss childhood trauma. The regulatory hurdles alone will give you anxiety that even your own app can't treat.",
        "competitors": ["Woebot", "Wysa", "Replika", "Youper"],
        "score": 5.5,
        "name_rating": "Generic - Sounds like a Black Mirror episode title",
        "advice": "Focus on a specific condition or demographic. 'AI for everyone' means 'AI for no one'.",
        "market_size": "Growing - $5B digital mental health market",
        "originality_score": 4.0,
        "execution_difficulty": "High - HIPAA, licensing, liability concerns"
    },
    {
        "name": "Blockchain Voting",
        "description": "Decentralized voting platform for elections",
        "verdict": "trash",
        "roast": "Nothing screams 'I don't understand either problem' like combining two complex systems and calling it innovation. Election officials everywhere just sighed.",
        "competitors": ["Voatz", "Polys", "Follow My Vote"],
        "score": 2.0,
        "name_rating": "Red Flag - Makes security experts twitch",
        "advice": "Study why every blockchain voting pilot has failed. The problem isn't technology.",
        "market_size": "Hostile - Government procurement is brutal",
        "originality_score": 2.0,
        "execution_difficulty": "Extreme - Security, regulation, public trust"
    },
    {
        "name": "LinkedIn for Gen Z",
        "description": "Professional networking app designed for young professionals",
        "verdict": "potential",
        "roast": "So LinkedIn but without the cringe motivational posts? Actually, that might work. But good luck competing with Microsoft's infinite resources.",
        "competitors": ["LinkedIn", "Lunchclub", "Shapr", "Bumble Bizz"],
        "score": 5.0,
        "name_rating": "Derivative - Defining yourself by the competition",
        "advice": "Don't just be 'LinkedIn minus the bad parts'. Find what Gen Z actually needs that LinkedIn fundamentally can't provide.",
        "market_size": "Massive - $15B professional networking market",
        "originality_score": 3.5,
        "execution_difficulty": "High - Network effects are brutal"
    },
    {
        "name": "Tinder for Cofounders",
        "description": "App to match startup founders with potential cofounders",
        "verdict": "potential",
        "roast": "Because what could go wrong with swiping right on someone you'll spend 80 hours a week with? At least breakups with cofounders involve lawyers.",
        "competitors": ["Y Combinator Cofounder Matching", "CoFoundersLab", "StartHawk"],
        "score": 6.0,
        "name_rating": "Clever - Instantly understandable concept",
        "advice": "The real challenge is matchmaking quality. Bad cofounder matches are startup killers.",
        "market_size": "Niche - Small but passionate market",
        "originality_score": 5.5,
        "execution_difficulty": "Medium - Trust and verification are key"
    },
    {
        "name": "Airbnb for Parking",
        "description": "Rent out your driveway or parking spot to drivers",
        "verdict": "potential",
        "roast": "The margins are thin, the complaints are thick, and your neighbors will definitely hate you. But at least you're solving a real problem.",
        "competitors": ["SpotHero", "ParkWhiz", "JustPark", "Parkable"],
        "score": 5.5,
        "name_rating": "Functional - Gets the point across",
        "advice": "Focus on high-demand areas first. Events, stadiums, airports. Don't try to boil the ocean.",
        "market_size": "Fragmented - $30B parking market, mostly offline",
        "originality_score": 4.0,
        "execution_difficulty": "Medium - City regulations vary wildly"
    },
    {
        "name": "Duolingo for Cooking",
        "description": "Gamified app that teaches cooking skills through daily lessons",
        "verdict": "gold",
        "roast": "Okay, this is actually not terrible. Gamification plus an essential life skill? The execution will make or break this, but at least you're not building another todo app.",
        "competitors": ["SideChef", "Tasty", "Yummly"],
        "score": 7.0,
        "name_rating": "Solid - Clear value proposition in the name",
        "advice": "The content moat is everything. Partner with culinary schools or celebrity chefs early.",
        "market_size": "Underserved - Cooking apps lack engagement loops",
        "originality_score": 7.5,
        "execution_difficulty": "Medium - Content creation at scale"
    }
]

