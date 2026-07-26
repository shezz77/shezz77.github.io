import Reveal from './Reveal'
import { process } from '../data'

export default function Process() {
  return (
    <section id="process" className="section">
      <Reveal className="section__head">
        <div className="kicker">02 — How we'll work</div>
        <h2 className="section__title">
          A clear path from ambiguity to a system you can trust.
        </h2>
      </Reveal>
      <div className="process-grid">
        {process.map((step) => (
          <Reveal key={step.no} className="card step">
            <div className="step__no">{step.no}</div>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__desc">{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
