import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import './StartupForm.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function StartupForm({ onSubmit, loading, error }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [exampleLoading, setExampleLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && description.trim()) {
      onSubmit(name.trim(), description.trim())
    }
  }

  const fillRandomExample = async () => {
    setExampleLoading(true)
    try {
      const response = await fetch(`${API_URL}/random-example`)
      if (response.ok) {
        const data = await response.json()
        setName(data.name)
        setDescription(data.description)
      }
    } catch {
      // silently fail
    } finally {
      setExampleLoading(false)
    }
  }

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Drop Your Idea 💡</h2>
          <p className="text-zinc-400 text-sm">We'll search the web and tell you the truth.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Startup Name
            </label>
            <Input
              type="text"
              placeholder='e.g., "Uber for Toasters" (please no)'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength={100}
              required
              className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 h-10 transition-colors focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              What does it do?
            </label>
            <Textarea
              placeholder="Describe your billion dollar idea... (we won't steal it, probably)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              maxLength={1000}
              required
              rows={4}
              className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 resize-none transition-colors focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
            <div className="text-right text-xs text-zinc-600 mt-1">
              {description.length}/1000
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <span>😵</span> {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={fillRandomExample}
              disabled={loading || exampleLoading}
              className="flex-1 bg-white/5 border-zinc-800 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              {exampleLoading ? '...' : '🎲 Random Idea'}
            </Button>
            
            <Button
              type="submit"
              disabled={loading || !name.trim() || !description.trim()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Roasting...
                </span>
              ) : (
                '🔥 Roast It'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default StartupForm
