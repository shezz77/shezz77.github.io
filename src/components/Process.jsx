import Reveal from './Reveal'
import { process } from '../data'
import { useInView } from '../hooks/useInView'

export default function Process() {
  const [railRef, inView] = useInView({ threshold: 0.25 })

  return (
    <section id="process" className="section">
      <Reveal className="section__head">
        <div className="kicker">02 — How we'll work</div>
        <h2 className="section__title">From ambiguity to a system you can trust.</h2>
      </Reveal>
      <div className={`process${inView ? ' is-drawn' : ''}`} ref={railRef}>
        <div className="process__rail" aria-hidden="true">
          {process.map((step, i) => (
            <span
              className="process__node"
              key={step.no}
              style={{ left: `${i * 25}%`, transitionDelay: `${0.15 + i * 0.48}s` }}
            />
          ))}
        </div>
        <div className="process-grid">
          {process.map((step) => (
            <Reveal key={step.no} className="step-cell">
              <div className="step-cell__no">{step.no}</div>
              <h3 className="step-cell__title">{step.title}</h3>
              <p className="step-cell__desc">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
