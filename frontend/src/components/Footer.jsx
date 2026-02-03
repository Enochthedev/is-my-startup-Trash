import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">🗑️</span>
          <span className="footer-name">Is My Startup Trash?</span>
        </div>
        
        <p className="footer-tagline">
          The only startup validator honest enough to tell you the truth.
        </p>
        
        <div className="footer-links">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="footer-divider">•</span>
          <a 
            href="/docs" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            API Docs
          </a>
          <span className="footer-divider">•</span>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        
        <p className="footer-disclaimer">
          ⚠️ Not responsible for crushed dreams, existential crises, or pivots to crypto.
        </p>
        
        <p className="footer-copyright">
          © {new Date().getFullYear()} Made with 🔥 and questionable life choices
        </p>
      </div>
    </footer>
  )
}

export default Footer
