import { useState } from 'react'
import './StartupForm.css'

const PLACEHOLDER_EXAMPLES = [
  { name: 'Uber for Cats', desc: 'On-demand cat sitting service' },
  { name: 'Netflix for NFTs', desc: 'Stream digital art collections' },
  { name: 'TikTok for Lawyers', desc: 'Short-form legal advice videos' },
  { name: 'Airbnb for Desks', desc: 'Rent out your home office hourly' },
]

function StartupForm({ onSubmit, loading, error }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [placeholder] = useState(
    PLACEHOLDER_EXAMPLES[Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length)]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() && description.trim()) {
      onSubmit(name.trim(), description.trim())
    }
  }

  const fillExample = () => {
    setName(placeholder.name)
    setDescription(placeholder.desc)
  }

  return (
    <div className="form-container animate-slide-up">
      <div className="form-card glass-card">
        <div className="form-header">
          <h2>Enter Your Startup Idea</h2>
          <p>We'll find competitors, rate your name, and deliver the truth.</p>
        </div>

        <form onSubmit={handleSubmit} className="startup-form">
          <div className="input-group">
            <label htmlFor="startup-name">Startup Name</label>
            <input
              id="startup-name"
              type="text"
              className="input"
              placeholder={`e.g., ${placeholder.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength={100}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="startup-description">What does it do?</label>
            <textarea
              id="startup-description"
              className="input"
              placeholder={`e.g., ${placeholder.desc}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              maxLength={1000}
              required
            />
            <span className="char-count">{description.length}/1000</span>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={fillExample}
              disabled={loading}
            >
              Try Example
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !name.trim() || !description.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Roasting...
                </>
              ) : (
                <>
                  🔥 Roast My Startup
                </>
              )}
            </button>
          </div>
        </form>

        <div className="form-disclaimer">
          <span>🤖</span>
          <span>Powered by GPT-4 + Web Search. No feelings were considered in this analysis.</span>
        </div>
      </div>
    </div>
  )
}

export default StartupForm
