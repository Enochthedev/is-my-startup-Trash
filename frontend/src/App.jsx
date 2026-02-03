import { useState } from 'react'
import StartupForm from './components/StartupForm'
import ResultCard from './components/ResultCard'
import ExamplesSection from './components/ExamplesSection'
import Footer from './components/Footer'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeStartup = async (name, description) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/analyze-startup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze your startup. Even our servers are skeptical.')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again!')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-emoji">🗑️</span>
            <span>Brutally Honest Feedback</span>
          </div>
          
          <h1 className="hero-title">
            Is My Startup <span className="text-gradient-trash">Trash?</span>
          </h1>
          
          <p className="hero-subtitle">
            Get AI-powered feedback that VCs are too polite to give you. 
            We search the web, find your competitors, and deliver the truth.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">47+</span>
              <span className="stat-label">Dog Walking Apps Found</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">∞</span>
              <span className="stat-label">"Uber for X" Ideas Roasted</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">0</span>
              <span className="stat-label">Feelings Spared</span>
            </div>
          </div>
        </div>
        
        <div className="hero-glow"></div>
      </header>

      {/* Main Section */}
      <main className="main">
        <div className="container">
          {!result ? (
            <StartupForm 
              onSubmit={analyzeStartup} 
              loading={loading} 
              error={error}
            />
          ) : (
            <ResultCard 
              result={result} 
              onReset={resetForm}
            />
          )}
        </div>
      </main>

      {/* Examples Section */}
      {!result && <ExamplesSection />}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
