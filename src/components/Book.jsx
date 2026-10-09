import Reveal from './Reveal'
import { book } from '../data'

export default function Book() {
  return (
    <section id="book" className="section">
      <Reveal className="book">
        <a
          href={book.href}
          className="book__cover"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${book.title} on Amazon`}
        >
          <img src={book.cover} alt={`Cover of ${book.title} by Shehzad Aslam`} width="938" height="1500" loading="lazy" />
        </a>
        <div className="book__body">
          <div className="kicker">04 — The book</div>
          <h2 className="book__title">{book.title}</h2>
          <p className="book__subtitle">{book.subtitle}</p>
          <p className="book__pitch">{book.pitch}</p>
          <ul className="book__points">
            {book.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="book__facts">
            {book.facts.map((fact) => (
              <div className="book__fact" key={fact.label}>
                <span className="book__fact-value">{fact.value}</span>
                <span className="book__fact-label">{fact.label}</span>
              </div>
            ))}
          </div>
          <div className="book__actions">
            <a href={book.href} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Get it on Kindle →
            </a>
            <span className="book__meta">
              {book.format} · {book.published}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
