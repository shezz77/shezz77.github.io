import { useScrollNav } from '../hooks/useScrollNav'

export default function Navbar() {
  const scrolled = useScrollNav()

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#top" className="nav__brand">
        Shehzad Aslam
      </a>
      <div className="nav__links">
        <a href="#services" className="nav__link nav__link--page">
          Services
        </a>
        <a href="#work" className="nav__link nav__link--page">
          Work
        </a>
        <a href="#process" className="nav__link nav__link--page">
          Process
        </a>
        <a href="#contact" className="nav__cta">
          Book a call
        </a>
      </div>
    </nav>
  )
}
