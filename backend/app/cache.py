"""
Simple in-memory caching for search results and AI responses.
Uses TTL-based expiration to keep data fresh.
"""
import hashlib
import time
from typing import Any, Dict, Optional, Tuple
from functools import wraps


class TTLCache:
    """Simple TTL-based cache with max size."""
    
    def __init__(self, max_size: int = 100, ttl_seconds: int = 3600):
        self._cache: Dict[str, Tuple[Any, float]] = {}
        self._max_size = max_size
        self._ttl = ttl_seconds
    
    def _normalize_key(self, text: str) -> str:
        """Normalize and hash text to create a cache key."""
        # Lowercase, strip whitespace, remove extra spaces
        normalized = ' '.join(text.lower().split())
        return hashlib.md5(normalized.encode()).hexdigest()
    
    def _evict_expired(self):
        """Remove expired entries."""
        now = time.time()
        expired = [k for k, (_, exp) in self._cache.items() if now > exp]
        for k in expired:
            del self._cache[k]
    
    def _evict_oldest(self):
        """Remove oldest entries if cache is full."""
        if len(self._cache) >= self._max_size:
            # Remove 20% of oldest entries
            sorted_items = sorted(self._cache.items(), key=lambda x: x[1][1])
            to_remove = max(1, len(sorted_items) // 5)
            for k, _ in sorted_items[:to_remove]:
                del self._cache[k]
    
    def get(self, key: str) -> Optional[Any]:
        """Get value from cache if exists and not expired."""
        self._evict_expired()
        cache_key = self._normalize_key(key)
        
        if cache_key in self._cache:
            value, expiry = self._cache[cache_key]
            if time.time() < expiry:
                print(f"[Cache] HIT for key: {key[:50]}...")
                return value
            else:
                del self._cache[cache_key]
        
        print(f"[Cache] MISS for key: {key[:50]}...")
        return None
    
    def set(self, key: str, value: Any):
        """Store value in cache with TTL."""
        self._evict_oldest()
        cache_key = self._normalize_key(key)
        expiry = time.time() + self._ttl
        self._cache[cache_key] = (value, expiry)
        print(f"[Cache] SET for key: {key[:50]}...")
    
    def clear(self):
        """Clear all cache entries."""
        self._cache.clear()


# Global cache instances
# Search cache: 1 hour TTL, max 100 entries
search_cache = TTLCache(max_size=100, ttl_seconds=3600)

# Response cache: 30 min TTL, max 50 entries (AI responses are larger)
response_cache = TTLCache(max_size=50, ttl_seconds=1800)
