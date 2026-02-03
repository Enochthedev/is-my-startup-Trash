import json
import re
from typing import List, Tuple
from openai import OpenAI
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

Be creative with your roasts - every response should feel fresh and unique.

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
            
            # Validate and return
            return StartupAnalysis(
                verdict=result.get("verdict", "trash"),
                roast=result.get("roast", "Our AI is speechless. That's either really good or really bad."),
                competitors=result.get("competitors", [])[:10],  # Limit to 10
                score=min(10, max(0, float(result.get("score", 5)))),
                name_rating=result.get("name_rating", "🤷 Undetermined"),
                advice=result.get("advice")
            )
            
        except Exception as e:
            print(f"OpenAI error: {e}")
            # Fallback response
            return StartupAnalysis(
                verdict="potential",
                roast="Our AI is having an existential crisis trying to process your idea. That's... something?",
                competitors=[],
                score=5.0,
                name_rating="🤖 Error - Even AI couldn't handle this",
                advice="Try again when our servers recover from your pitch"
            )


# Pre-built example roasts for demo/fallback
EXAMPLE_ROASTS = {
    "uber for dogs": {
        "verdict": "trash",
        "roast": "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch. The only thing 'Uber for Dogs' is disrupting is my patience.",
        "competitors": ["Rover", "Wag", "Barkly", "PetBacker", "Care.com"],
        "score": 2.5,
        "name_rating": "🗑️ Peak 2015 Cringe - 'Uber for X' should be illegal",
        "advice": "Maybe focus on a specific niche like luxury pet services or pet medical transport?"
    },
    "netflix for books": {
        "verdict": "trash",
        "roast": "Congratulations, you've invented the public library. Except somehow worse because now there's a subscription fee.",
        "competitors": ["Kindle Unlimited", "Audible", "Scribd", "Your Local Library"],
        "score": 1.5,
        "name_rating": "😴 So Original - Said no one ever",
        "advice": "This literally exists in multiple forms. What makes yours different?"
    },
    "ai therapist": {
        "verdict": "potential",
        "roast": "Oh great, another AI that wants to discuss my childhood trauma. At least it won't judge me for crying about my startup failing.",
        "competitors": ["Woebot", "Wysa", "Replika", "BetterHelp (sort of)"],
        "score": 5.5,
        "name_rating": "😬 Generic - Sounds like a Black Mirror episode",
        "advice": "The space is crowded but there might be room for specific use cases. Consider focusing on a particular mental health need."
    }
}
