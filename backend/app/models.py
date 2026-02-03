from pydantic import BaseModel, Field
from typing import Literal, List, Optional


class StartupInput(BaseModel):
    """Input model for startup analysis request."""
    name: str = Field(..., description="The name of your startup", min_length=1, max_length=100)
    description: str = Field(..., description="What your startup does", min_length=10, max_length=1000)
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Uber for Dogs",
                    "description": "On-demand dog walking app that connects busy pet owners with verified dog walkers in their neighborhood"
                }
            ]
        }
    }


class StartupAnalysis(BaseModel):
    """Output model for startup analysis result."""
    verdict: Literal["trash", "potential", "gold"] = Field(
        ..., 
        description="The ultimate verdict on your startup idea"
    )
    roast: str = Field(
        ..., 
        description="A brutally honest (and funny) assessment of your startup"
    )
    competitors: List[str] = Field(
        default_factory=list,
        description="List of existing competitors we found"
    )
    score: float = Field(
        ..., 
        ge=0, 
        le=10,
        description="Originality/viability score from 0-10"
    )
    name_rating: str = Field(
        ...,
        description="How terrible (or good) is the startup name"
    )
    advice: Optional[str] = Field(
        None,
        description="Optional advice if we're feeling generous"
    )
    # New professional metrics
    market_size: Optional[str] = Field(
        None,
        description="Estimated market size assessment"
    )
    originality_score: Optional[float] = Field(
        None,
        ge=0,
        le=10,
        description="How original is this idea (0-10)"
    )
    execution_difficulty: Optional[str] = Field(
        None,
        description="How hard would this be to build"
    )
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "verdict": "trash",
                    "roast": "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch. The only thing 'Uber for Dogs' is disrupting is my patience.",
                    "competitors": ["Rover", "Wag", "Barkly", "PetBacker"],
                    "score": 2.5,
                    "name_rating": "Cringe - 'Uber for X' died in 2015",
                    "advice": "Maybe try something that doesn't make VCs physically cringe when they read your pitch deck?",
                    "market_size": "Saturated - $1.2B market with 50+ players",
                    "originality_score": 1.5,
                    "execution_difficulty": "Medium - Standard marketplace model"
                }
            ]
        }
    }


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "healthy"
    message: str = "Ready to roast your dreams"
    version: str = "1.0.0"


class StatsResponse(BaseModel):
    """API statistics response."""
    total_roasts: int = 0
    trash_count: int = 0
    potential_count: int = 0
    gold_count: int = 0
    average_score: float = 0.0
    top_competitors_found: List[str] = []
