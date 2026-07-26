import { marquee } from '../data'

export default function Marquee() {
  // Duplicate the list so the -50% loop is seamless.
  const loop = [...marquee, ...marquee]

  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            {item}
            <span className="marquee__slash">/</span>
          </span>
        ))}
      </div>
    </section>
  )
}
