import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { competencies } from '../data'

function CompetencyCard({ cat }) {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className="reveal comp"
      style={inView ? { opacity: 1, transform: 'none' } : undefined}
    >
      <div className="comp__head">
        <span className="comp__no">{cat.no}</span>
        <h3 className="comp__name">{cat.name}</h3>
      </div>
      {cat.skills.map((skill, k) => (
        <div className="meter" key={skill.name}>
          <div className="meter__head">
            <span className="meter__name">{skill.name}</span>
            <span className="meter__pct">{skill.level}%</span>
          </div>
          <div className="meter__track">
            <div
              className="meter__fill"
              style={{
                width: inView ? `${skill.level}%` : '0%',
                transitionDelay: `${k * 45}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal className="section__head">
        <div className="kicker">04 — Stack &amp; depth</div>
        <h2 className="section__title">
          Deep across the modern PHP &amp; JavaScript stacks.
        </h2>
      </Reveal>
      <div className="skills-grid">
        {competencies.map((cat) => (
          <CompetencyCard key={cat.name} cat={cat} />
        ))}
      </div>
    </section>
  )
}
