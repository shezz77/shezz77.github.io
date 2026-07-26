import Reveal from './Reveal'
import { engagements } from '../data'

export default function Work() {
  return (
    <section id="work" className="section">
      <Reveal className="section__head">
        <div className="kicker">03 — Selected engagements</div>
        <h2 className="section__title">Products I've architected and shipped.</h2>
      </Reveal>
      <div className="work-grid">
        {engagements.map((eng) => (
          <Reveal key={eng.client} className="eng-card">
            <span className="eng__ring" aria-hidden="true" />
            <div className="eng__top">
              <span className="eng__client">{eng.client}</span>
              <span className="eng__role">{eng.role}</span>
            </div>
            <h3 className="eng__title">{eng.title}</h3>
            <p className="eng__desc">{eng.desc}</p>
            <div className="eng__tags">
              {eng.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
