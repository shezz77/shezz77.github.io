import Reveal from './Reveal'
import { links } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <Reveal className="contact__head">
          <div className="kicker">06 — Let's talk</div>
          <h2 className="contact__title">Have a system worth getting right?</h2>
          <p className="contact__lead">
            Book a free 30-minute architecture call. We'll pressure-test your plan, surface the
            real risks, and map the fastest path to something that scales — no obligation.
          </p>
          <div className="contact__actions">
            <a
              href="mailto:shezz77.se@gmail.com?subject=Architecture%20call"
              className="btn-primary"
            >
              Book a free call →
            </a>
            <a href="mailto:shezz77.se@gmail.com" className="contact__email">
              shezz77.se@gmail.com
            </a>
          </div>
        </Reveal>

        <div className="contact__links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="contact__footer">
          <span>+92 300 9878282 · Lahore, Pakistan · remote — global</span>
          <span>Shehzad Aslam — Software Architect &amp; Engineering Manager</span>
        </div>
      </div>
    </section>
  )
}
