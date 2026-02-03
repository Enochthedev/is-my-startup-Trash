import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import './Footer.css'

function Footer() {
  const [showCredit, setShowCredit] = useState(false)
  const [clicks, setClicks] = useState(0)

  const handleLogoClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)
    if (newClicks >= 5) {
      setShowCredit(true)
      setClicks(0)
    }
  }

  return (
    <footer className="footer border-t border-white/5 py-8 px-4 text-center">
      <div className="max-w-md mx-auto">
        <div 
          onClick={handleLogoClick}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-400 cursor-pointer transition mb-4"
          title={clicks > 0 ? `${5 - clicks} more clicks... 👀` : ''}
        >
          <span className="text-xl">🗑️</span>
          <span className="font-semibold">Is My Startup Trash?</span>
        </div>
        
        <p className="text-xs text-gray-600 mb-4">
          Destroying startup dreams since 2024 🔥
        </p>
        
        <div className="flex justify-center gap-4 mb-4">
          <a 
            href="https://github.com/enochthedev/is-my-startup-trash" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-indigo-400 transition"
          >
            💻 GitHub
          </a>
          <span className="text-gray-700">•</span>
          <a 
            href="/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-indigo-400 transition"
          >
            📚 API
          </a>
          <span className="text-gray-700">•</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCredit(!showCredit)}
            className="text-xs text-gray-500 hover:text-indigo-400 h-auto p-0"
          >
            👋 About
          </Button>
        </div>

        {showCredit && (
          <Card className="mb-4 bg-white/[0.02] border-white/10 inline-block">
            <CardContent className="pt-4 pb-4">
              <img 
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=wave&backgroundColor=transparent" 
                alt="Wave"
                className="w-16 h-16 mx-auto mb-2 rounded-full border border-indigo-500"
              />
              <p className="text-xs text-gray-500 mb-2">built by</p>
              <div className="flex gap-4 justify-center mb-2">
                <a 
                  href="https://github.com/enochthedev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                  💻 enochthedev
                </a>
                <a 
                  href="https://twitter.com/wavedidwhat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                  🐦 @wavedidwhat
                </a>
              </div>
              <p className="text-xs text-gray-500">✨ made with vibes ✨</p>
            </CardContent>
          </Card>
        )}
        
        <p className="text-[10px] text-gray-700 mb-4">
          ⚠️ Not responsible for crushed dreams or pivots to crypto.
        </p>
        
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Built by{' '}
          <a 
            href="https://twitter.com/wavedidwhat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            wave
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
