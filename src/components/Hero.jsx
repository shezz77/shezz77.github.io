import { usePerspectiveGrid } from '../hooks/usePerspectiveGrid'
import Terminal from './Terminal'
import { heroTokens } from '../data'

export default function Hero() {
  const canvasRef = usePerspectiveGrid()

  return (
    <header id="top" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {heroTokens.map((tok) => (
        <div
          key={tok.label}
          className={`hero__token${tok.tone === 'rust' ? ' hero__token--rust' : ''}`}
          aria-hidden="true"
          style={{
            top: tok.top,
            left: tok.left,
            animationDuration: tok.dur,
            animationDelay: tok.delay,
          }}
        >
          {tok.label}
        </div>
      ))}

      <div className="hero__inner">
        <div className="hero__meta">
          <span>[ Software Architect / Engineering Manager ]</span>
          <span>Est. 2013 — 11+ yrs</span>
        </div>

        <div className="hero__grid">
          <div>
            <h1 className="hero__title">
              Architecture
              <br />
              that <span className="accent">scales.</span>
            </h1>
            <p className="hero__lead">
              Event-driven microservices, hardened pipelines, and the engineering leadership to
              ship them. Fractional, principal-level, remote-first — 11+ years turning ambiguous
              requirements into resilient product.
            </p>
            <div className="hero__actions">
              <a href="#contact" className="btn-primary">
                Book a free call →
              </a>
              <a href="#work" className="btn-ghost">
                Selected work
              </a>
            </div>
            <div className="hero__badges">
              <span className="hero__badge">
                <span className="dot" />
                available for new engagements
              </span>
              <span>Lahore, PK · remote — global</span>
            </div>
          </div>

          <Terminal />
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="scroll-hint__dot" />
      </div>
    </header>
  )
}
