import './ExamplesSection.css'

const EXAMPLES = [
  {
    name: 'Uber for Dogs',
    verdict: 'trash',
    score: 2.5,
    roast: "There are literally 47 dog walking apps. Your name sounds like a rejected SNL sketch.",
    competitors: ['Rover', 'Wag', 'Barkly'],
  },
  {
    name: 'Netflix for Books',
    verdict: 'trash',
    score: 1.5,
    roast: "Congratulations, you've invented the public library. Except somehow worse.",
    competitors: ['Kindle Unlimited', 'Scribd', 'Library'],
  },
  {
    name: 'AI Therapist',
    verdict: 'potential',
    score: 5.5,
    roast: "Oh great, another AI that wants to discuss my childhood trauma.",
    competitors: ['Woebot', 'Wysa', 'Replika'],
  },
]

const VERDICT_EMOJI = {
  trash: '🗑️',
  potential: '🤔',
  gold: '✨',
}

function ExamplesSection() {
  return (
    <section className="examples-section">
      <div className="examples-container">
        <h2 className="examples-title">
          <span className="title-emoji">📋</span>
          Hall of <span className="text-gradient-trash">Shame</span>
        </h2>
        <p className="examples-subtitle">
          See how we've roasted other "innovative" ideas
        </p>

        <div className="examples-grid">
          {EXAMPLES.map((example, index) => (
            <div key={index} className="example-card glass-card">
              <div className="example-header">
                <span className="example-name">{example.name}</span>
                <span className="example-verdict">
                  {VERDICT_EMOJI[example.verdict]} {example.verdict.toUpperCase()}
                </span>
              </div>
              
              <p className="example-roast">"{example.roast}"</p>
              
              <div className="example-footer">
                <div className="example-score">
                  <span className="score-num">{example.score}</span>
                  <span className="score-max">/10</span>
                </div>
                <div className="example-competitors">
                  {example.competitors.slice(0, 2).map((c, i) => (
                    <span key={i} className="competitor-mini">{c}</span>
                  ))}
                  {example.competitors.length > 2 && (
                    <span className="competitor-more">+{example.competitors.length - 2}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExamplesSection
