import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import './ResultCard.css'

// Inline icons to avoid dependency issues while maintaining consistent style
const Icons = {
  Flame: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.3-1 .8-2 1.5-2.8.3.6.8 1.1 1.4 1.6"/></svg>,
  TrendingUp: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Tag: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828l-5-5z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>,
  Users: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Lightbulb: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  RotateCcw: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
  Share: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>,
  X: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> 
}

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
          <Icons.Flame className="w-3 h-3" /> The Roast
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
              <Icons.TrendingUp className="w-3 h-3" /> Market Reality
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
            <Icons.Tag className="w-3 h-3" /> Name Check
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
            <Icons.Users className="w-3 h-3" /> Competitors
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
             <Icons.Lightbulb className="w-3 h-3" /> Verdict
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
          <Icons.X className="w-4 h-4 mr-2" />
          Share on X
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full h-12 bg-transparent border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
        >
          <Icons.RotateCcw className="w-4 h-4 mr-2" />
          Try Another Idea
        </Button>
      </div>
    </div>
  )
}

export default ResultCard
