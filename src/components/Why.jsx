import Reveal from './Reveal'
import { stats } from '../data'

export default function Why() {
  return (
    <section id="why" className="section">
      <Reveal className="why-grid">
        <div>
          <div className="kicker">05 — Why work with me</div>
          <h2 className="why__title">
            Eleven years turning technical risk into shipped product.
          </h2>
          <p className="why__body">
            I've owned technical direction end to end as Principal Engineer and Engineering
            Manager — system design, cloud infrastructure, CI/CD, code quality, and delivery — for
            web, SaaS, and cross-platform products across the Middle East, crypto, and rail
            industries.
          </p>
          <p className="why__body">
            You get a partner who designs pragmatically, ships reliably, and leaves your team
            stronger than they found it.
          </p>
        </div>
        <div className="why__stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
