import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, TrendingUp, Tag, Users, Lightbulb, Flame } from 'lucide-react'
import './ResultCard.css'

function ResultCard({ result, onReset }) {
  const getVerdictStyle = () => {
    switch (result.verdict) {
      case 'trash': return 'text-red-400 border-red-500/50 bg-red-500/10'
      case 'gold': return 'text-green-400 border-green-500/50 bg-green-500/10'
      default: return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10'
    }
  }

  const getScoreColor = () => {
    if (result.score < 4) return 'text-red-400'
    if (result.score < 7) return 'text-yellow-400'
    return 'text-green-400'
  }

  const shareOnTwitter = () => {
    const text = `I just got roasted by Is My Startup Trash? 💀\n\nVerdict: ${result.verdict.toUpperCase()}\nScore: ${result.score}/10\n\n"${result.roast.substring(0, 100)}..."\n\n@wavedidwhat #IsMyStartupTrash`
    const url = window.location.origin
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Verdict & Score */}
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm overflow-hidden">
        <div className={`h-2 w-full ${
          result.verdict === 'trash' ? 'bg-red-500' : 
          result.verdict === 'gold' ? 'bg-green-500' : 'bg-yellow-500'
        }`} />
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold tracking-wide border uppercase ${getVerdictStyle()}`}>
              {result.verdict}
            </span>
          </div>
          
          <div className="relative inline-block">
            <span className={`text-7xl font-bold tracking-tighter ${getScoreColor()}`}>
              {result.score.toFixed(1)}
            </span>
            <span className="text-zinc-500 text-lg absolute -right-8 top-2">/10</span>
          </div>
          <p className="text-zinc-500 text-sm mt-2">Viability Score</p>
        </CardContent>
      </Card>

      {/* The Roast */}
      <div className="space-y-2">
        <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider pl-1 flex items-center gap-2">
          <Flame className="w-3 h-3" /> The Roast
        </h3>
        <Card className="bg-zinc-900/30 border-zinc-800/50">
          <CardContent className="p-6">
            <p className="text-lg text-zinc-200 leading-relaxed font-light">
              "{result.roast}"
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.market_size && (
          <div className="space-y-2">
            <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider pl-1 flex items-center gap-2">
              <TrendingUp className="w-3 h-3" /> Market Reality
            </h3>
            <Card className="bg-zinc-900/30 border-zinc-800/50 h-full">
              <CardContent className="p-5">
                <p className="text-sm text-zinc-300">{result.market_size}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider pl-1 flex items-center gap-2">
            <Tag className="w-3 h-3" /> Name Check
          </h3>
          <Card className="bg-zinc-900/30 border-zinc-800/50 h-full">
            <CardContent className="p-5">
              <p className="text-sm text-zinc-300">{result.name_rating}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Competitors */}
      {result.competitors && result.competitors.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider pl-1 flex items-center gap-2">
            <Users className="w-3 h-3" /> Competitors
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.competitors.map((c, i) => (
              <span key={i} className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-800 rounded-md text-sm text-zinc-400">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Advice */}
      {result.advice && (
        <div className="space-y-2">
           <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider pl-1 flex items-center gap-2">
             <Lightbulb className="w-3 h-3" /> Verdict
           </h3>
          <Card className="bg-zinc-900/30 border-zinc-800/50">
            <CardContent className="p-5">
              <p className="text-sm text-zinc-300">{result.advice}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 flex flex-col gap-3">
        <Button
          onClick={shareOnTwitter}
          className="w-full h-12 bg-black hover:bg-zinc-900 text-white font-bold text-base border border-zinc-800 shadow-sm transition-all"
        >
          <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share on X
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full h-12 bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Another Idea
        </Button>
      </div>
    </div>
  )
}

export default ResultCard
