import './ResultCard.css'

const VERDICT_CONFIG = {
  trash: {
    emoji: '🗑️',
    label: 'TRASH',
    gradient: 'var(--gradient-trash)',
    glow: 'var(--shadow-glow-trash)',
    message: 'Sorry, this idea belongs in the bin.',
  },
  potential: {
    emoji: '🤔',
    label: 'POTENTIAL',
    gradient: 'var(--gradient-potential)',
    glow: 'var(--shadow-glow-potential)',
    message: 'Not terrible, but needs work.',
  },
  gold: {
    emoji: '✨',
    label: 'GOLD',
    gradient: 'var(--gradient-gold)',
    glow: 'var(--shadow-glow-gold)',
    message: 'Actually... this might work!',
  },
}

function ResultCard({ result, onReset }) {
  const config = VERDICT_CONFIG[result.verdict] || VERDICT_CONFIG.potential

  return (
    <div className="result-container animate-slide-up">
      {/* Verdict Header */}
      <div 
        className="verdict-card glass-card"
        style={{ '--verdict-gradient': config.gradient, '--verdict-glow': config.glow }}
      >
        <div className="verdict-emoji">{config.emoji}</div>
        <div className="verdict-label">{config.label}</div>
        <div className="verdict-message">{config.message}</div>
        
        {/* Score Ring */}
        <div className="score-container">
          <div className="score-ring">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(result.score / 10) * 283} 283`}
                transform="rotate(-90 50 50)"
                className="score-progress"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={result.score < 4 ? '#FF6B6B' : result.score < 7 ? '#FFD93D' : '#6BCB77'} />
                  <stop offset="100%" stopColor={result.score < 4 ? '#FF8E53' : result.score < 7 ? '#FF9F43' : '#4ECDC4'} />
                </linearGradient>
              </defs>
            </svg>
            <div className="score-value">{result.score.toFixed(1)}</div>
          </div>
          <div className="score-label">Viability Score</div>
        </div>
      </div>

      {/* Roast Section */}
      <div className="roast-card glass-card">
        <div className="roast-header">
          <span className="roast-icon">🔥</span>
          <h3>The Roast</h3>
        </div>
        <p className="roast-text">{result.roast}</p>
      </div>

      {/* Name Rating */}
      <div className="detail-card glass-card">
        <div className="detail-header">
          <span className="detail-icon">📛</span>
          <h3>Name Rating</h3>
        </div>
        <p className="name-rating">{result.name_rating}</p>
      </div>

      {/* Competitors */}
      {result.competitors && result.competitors.length > 0 && (
        <div className="competitors-card glass-card">
          <div className="detail-header">
            <span className="detail-icon">⚔️</span>
            <h3>Competitors Found</h3>
          </div>
          <div className="competitors-list">
            {result.competitors.map((competitor, index) => (
              <span key={index} className="competitor-tag">
                {competitor}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Advice (if available) */}
      {result.advice && (
        <div className="advice-card glass-card">
          <div className="detail-header">
            <span className="detail-icon">💡</span>
            <h3>Constructive Advice</h3>
          </div>
          <p className="advice-text">{result.advice}</p>
        </div>
      )}

      {/* Actions */}
      <div className="result-actions">
        <button className="btn btn-secondary" onClick={onReset}>
          ← Try Another Idea
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => {
            const text = `My startup "${result.verdict}" with a score of ${result.score}/10! 🔥\n\n${result.roast}\n\nCheck yours at IsMyStartupTrash.com`
            if (navigator.share) {
              navigator.share({ text })
            } else {
              navigator.clipboard.writeText(text)
              alert('Roast copied to clipboard!')
            }
          }}
        >
          Share This Roast
        </button>
      </div>
    </div>
  )
}

export default ResultCard
