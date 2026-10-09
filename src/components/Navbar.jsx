import { useScrollNav } from '../hooks/useScrollNav'
import { useScrollSpy } from '../hooks/useScrollSpy'

// Document order — useScrollSpy picks the last one scrolled past.
const SECTIONS = ['services', 'process', 'work', 'book', 'contact']

export default function Navbar() {
  const scrolled = useScrollNav()
  const active = useScrollSpy(SECTIONS)

  const linkClass = (id) => `nav__link nav__link--page${active === id ? ' is-active' : ''}`

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#top" className="nav__brand">
        Shehzad Aslam
      </a>
      <div className="nav__links">
        <a href="#services" className={linkClass('services')}>
          Services
        </a>
        <a href="#work" className={linkClass('work')}>
          Work
        </a>
        <a href="#book" className={linkClass('book')}>
          Book
        </a>
        <a href="#process" className={linkClass('process')}>
          Process
        </a>
        <a href="/blog/" className="nav__link nav__link--page">
          Blog
        </a>
        <a href="#contact" className="nav__cta">
          Book a call
        </a>
      </div>
    </nav>
  )
}
