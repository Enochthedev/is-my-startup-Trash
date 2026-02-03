import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import './ExamplesSection.css'

const EXAMPLES = [
  {
    name: 'Uber for Dogs',
    verdict: 'trash',
    score: 2.5,
    roast: "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch.",
    competitors: ['Rover', 'Wag', 'Barkly'],
    reaction: '💀',
  },
  {
    name: 'Netflix for Books',
    verdict: 'trash',
    score: 1.5,
    roast: "Congratulations, you've invented the public library. Except somehow worse.",
    competitors: ['Kindle Unlimited', 'Scribd', 'Library'],
    reaction: '📚',
  },
  {
    name: 'AI Therapist',
    verdict: 'potential',
    score: 5.5,
    roast: "Oh great, another AI that wants to discuss my childhood trauma.",
    competitors: ['Woebot', 'Wysa', 'Replika'],
    reaction: '🤖',
  },
]

const VERDICT_CONFIG = {
  trash: {
    emoji: '🗑️',
    gradient: 'from-red-500/20 via-orange-500/10 to-transparent',
    border: 'border-red-500/30 hover:border-red-500/50',
    scoreColor: 'text-red-400',
    glow: 'hover:shadow-red-500/20',
  },
  potential: {
    emoji: '🤔',
    gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
    border: 'border-yellow-500/30 hover:border-yellow-500/50',
    scoreColor: 'text-yellow-400',
    glow: 'hover:shadow-yellow-500/20',
  },
  gold: {
    emoji: '✨',
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    border: 'border-green-500/30 hover:border-green-500/50',
    scoreColor: 'text-green-400',
    glow: 'hover:shadow-green-500/20',
  },
}

// DiceBear avatar for each example
const getExampleAvatar = (name, verdict) => {
  const style = verdict === 'trash' ? 'thumbs' : verdict === 'gold' ? 'lorelei' : 'bottts'
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name)}&backgroundColor=transparent`
}

function ExamplesSection() {
  return (
    <section className="examples-section py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-4xl mr-2">💀</span>
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Shame</span>
          </h2>
          <p className="text-gray-500">
            These startups walked so yours could... also fail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXAMPLES.map((example, index) => {
            const config = VERDICT_CONFIG[example.verdict]
            return (
              <Card 
                key={index} 
                className={`group relative overflow-hidden bg-gradient-to-b ${config.gradient} backdrop-blur-sm ${config.border} border transition-all duration-300 hover:scale-[1.02] ${config.glow} hover:shadow-lg`}
              >
                {/* Background reaction emoji */}
                <div className="absolute -right-4 -top-4 text-7xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {example.reaction}
                </div>
                
                <CardHeader className="pb-2 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img 
                        src={getExampleAvatar(example.name, example.verdict)} 
                        alt={example.name}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10"
                      />
                      <span className="absolute -bottom-1 -right-1 text-lg">
                        {config.emoji}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-white mb-1 group-hover:text-white/90">
                        {example.name}
                      </CardTitle>
                      <Badge variant={example.verdict} className="text-xs">
                        {example.verdict.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2 relative z-10">
                  <p className="text-gray-400 text-sm italic mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                    "{example.roast}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${config.scoreColor}`}>
                        {example.score}
                      </span>
                      <span className="text-gray-600 text-sm">/10</span>
                    </div>
                    <div className="flex gap-1.5">
                      {example.competitors.slice(0, 2).map((c, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-500 border border-white/5"
                        >
                          {c}
                        </span>
                      ))}
                      {example.competitors.length > 2 && (
                        <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">
                          +{example.competitors.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExamplesSection
