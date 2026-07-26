import Reveal from './Reveal'
import { services } from '../data'

export default function Services() {
  return (
    <section id="services" className="section section--first">
      <Reveal className="section__head">
        <div className="kicker">01 — What I do for you</div>
        <h2 className="section__title">
          Senior engineering firepower, without the full-time hire.
        </h2>
        <p className="section__lead">
          Bring me in to design the system, harden the pipeline, and lead the team — as a
          fractional architect, a project build, or an ongoing engineering partner.
        </p>
      </Reveal>
      <div className="svc-grid">
        {services.map((svc) => (
          <Reveal key={svc.no} className="svc-cell">
            <div className="svc-cell__no">{svc.no}</div>
            <h3 className="svc-cell__title">{svc.title}</h3>
            <p className="svc-cell__desc">{svc.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
