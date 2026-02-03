import json
import re
from typing import List, Tuple
from openai import OpenAI
from duckduckgo_search import AsyncDDGS
from .models import StartupAnalysis


class StartupRoaster:
    """The Startup Roaster - crushing dreams since 2024."""
    
    def __init__(self, openrouter_api_key: str):
        # Using OpenRouter for cheaper model access
        # Note: We keep OpenAI sync for now to minimize changes, blocking is "fine" for this scale
        self.client = OpenAI(
            api_key=openrouter_api_key,
            base_url="https://openrouter.ai/api/v1"
        )
        # No implicit session reused in new version, we instantiate per use or manage clean up
        # AsyncDDGS context manager is preferred, or standard usage
    
    async def search_competitors(self, name: str, description: str) -> Tuple[List[str], str]:
        """Search the web for existing competitors using AsyncDDGS."""
        try:
            async with AsyncDDGS() as ddgs:
                # Search for similar startups/apps
                search_query = f"{description} app startup competitors"
                # AsyncDDGS return lists or iterables, we await/iterate them
                results = await ddgs.text(search_query, max_results=10)
                
                # Also search for the specific concept
                concept_query = f"{name} similar apps alternatives"
                concept_results = await ddgs.text(concept_query, max_results=5)
                
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
    
    async def analyze_startup(self, name: str, description: str) -> StartupAnalysis:
        """Analyze and roast a startup idea."""
        
        # First, search for competitors (Async!)
        # Check if search_competitors is properly awaited
        search_results, search_context = await self.search_competitors(name, description)
        
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
"""

        user_prompt = f"""Analyze this startup idea:

**Startup Name:** {name}
**Description:** {description}

**Web Search Results (existing competitors/similar products):**
{search_context}

Based on the search results and your startup wisdom, deliver your verdict. 
Extract actual competitor names from the search results if found.
Remember: Be brutally honest, genuinely funny, and secretly helpful."""

        try:
            # We wrap the synchronous OpenAI call in a way that doesn't matter much for this demo 
            # (blocking loop for 1-2s is acceptable here)
            response = self.client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=1.2,
                top_p=0.95,
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


# Pre-built example roasts for demo/fallback
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
    }
]
