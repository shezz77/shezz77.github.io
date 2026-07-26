import Reveal from './Reveal'
import EngCard from './EngCard'
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
          <EngCard key={eng.client} eng={eng} />
        ))}
      </div>
    </section>
  )
}
