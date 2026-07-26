import { useRef } from 'react'
import { useInView } from '../hooks/useInView'

// A single engagement card with a cursor-following amber spotlight and a subtle
// 3D tilt. Reveal-on-scroll is inlined (rather than via <Reveal>) so the same
// DOM node carries both the intersection ref and the pointer handlers.
export default function EngCard({ eng }) {
  const [inViewRef, inView] = useInView()
  const cardRef = useRef(null)

  const setRef = (node) => {
    cardRef.current = node
    inViewRef.current = node
  }

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
    const rx = (0.5 - py) * 7
    const ry = (px - 0.5) * 7
    el.style.transform = `perspective(820px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`
  }

  const onLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = ''
  }

  return (
    <div
      ref={setRef}
      className={`reveal eng-card${inView ? ' is-visible' : ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="eng-card__glow" aria-hidden="true" />
      <span className="eng-card__ring" aria-hidden="true" />
      <div className="eng-card__top">
        <span className="eng-card__client">{eng.client}</span>
        <span className="eng-card__role">{eng.role}</span>
      </div>
      <h3 className="eng-card__title">{eng.title}</h3>
      <p className="eng-card__desc">{eng.desc}</p>
      <div className="eng-card__tags">
        {eng.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
