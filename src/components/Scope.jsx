import { useState } from 'react'
import Reveal from './Reveal'
import { QUESTIONS, REQUIRED, buildScope, scopeAsText } from '../scopeRules'

// The scope builder. A visitor answers six quick questions and gets a
// first-pass scope assembled from scopeRules.js, entirely in the browser.
// Only "Send it to me" talks to the server (/api/lead.php, server/lead.php),
// and a mailto: link stands in wherever that isn't available.

const ENDPOINT = '/api/lead.php'
const EMAIL = 'shezz77.se@gmail.com'

function readRef() {
  try {
    return sessionStorage.getItem('shezz77:ref') || ''
  } catch {
    return ''
  }
}

function Choice({ question, value, onChange }) {
  const selected = (v) => (question.multi ? (value || []).includes(v) : value === v)
  const toggle = (v) => {
    if (!question.multi) return onChange(v)
    onChange((list = []) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]))
  }
  return (
    <fieldset className="scope__q">
      <legend>{question.label}</legend>
      {question.hint && <span className="scope__small">{question.hint}</span>}
      <div className="scope__options">
        {question.options.map((o) => (
          <button
            type="button"
            key={o.value}
            className={`scope__chip${selected(o.value) ? ' is-on' : ''}`}
            aria-pressed={selected(o.value)}
            onClick={() => toggle(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function ScopeResult({ scope }) {
  return (
    <article className="scope__result">
      <header>
        <span className="scope__fit">First-pass scope</span>
        <h3 className="scope__result-title">{scope.title}</h3>
        <p className="scope__summary">{scope.summary}</p>
      </header>

      <div className="scope__cols">
        <section>
          <h4 className="scope__h">Approach</h4>
          <ol className="scope__list">
            {scope.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <section>
          <h4 className="scope__h">Phases</h4>
          <ul className="scope__phases">
            {scope.phases.map((p) => (
              <li key={p.name}>
                <span className="scope__weeks">{p.range ? `${p.weeks} wk` : p.weeks}</span>
                <span>
                  <strong>{p.name}</strong>
                  <br />
                  {p.deliverable}
                </span>
              </li>
            ))}
          </ul>
          <p className="scope__small">
            {scope.total ? `About ${scope.total} weeks of one senior engineer. ` : ''}
            A short call narrows the range.
          </p>
        </section>
      </div>

      <section>
        <h4 className="scope__h">Risks to plan for</h4>
        <ul className="scope__risks">
          {scope.risks.map((r) => (
            <li key={r.risk}>
              <strong>{r.risk}.</strong> {r.mitigation}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="scope__h">Assumed</h4>
        <ul className="scope__assumptions">
          {scope.assumptions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}

function SendPanel({ scope, answers, onEdit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [state, setState] = useState('idle') // idle | sending | sent | failed
  const [error, setError] = useState('')

  const text = scopeAsText(scope, answers, notes)
  const mailto =
    `mailto:${EMAIL}?subject=${encodeURIComponent(`Scope: ${scope.title}`)}` +
    `&body=${encodeURIComponent(`Hi Shehzad,\n\nI used the scope builder on your site:\n\n${text}\n\n`.slice(0, 1800))}`

  const send = async (e) => {
    e.preventDefault()
    setState('sending')
    setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, notes, website, answers, scope: text, ref: readRef() }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw new Error(data?.error || '')
      setState('sent')
      // The confirmation is much shorter than the form; keep it in view.
      requestAnimationFrame(() =>
        document.querySelector('.scope__next')?.scrollIntoView({ block: 'center', behavior: 'smooth' }),
      )
    } catch (err) {
      setError(err.message || "That didn't go through.")
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <div className="scope__next">
        <div>
          <div className="scope__h">Sent</div>
          <p className="scope__first">
            Thanks{name ? `, ${name.split(' ')[0]}` : ''}. I read every one myself and reply within a working day, usually
            with a few questions and a time to talk.
          </p>
        </div>
        <div className="scope__actions">
          <button type="button" className="scope__ghost" onClick={onEdit}>
            Scope another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="scope__next scope__send" onSubmit={send}>
      <div className="scope__send-copy">
        <div className="scope__h">Suggested first step</div>
        <p className="scope__first">{scope.firstStep}</p>
        <p className="scope__first-note">
          Send this to me and I'll reply personally with what I'd change, usually within a working day.
        </p>
      </div>
      <div className="scope__send-fields">
        <div className="scope__contact">
          <input
            className="scope__input"
            placeholder="Your name"
            autoComplete="name"
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="scope__input"
            type="email"
            required
            placeholder="Your email"
            autoComplete="email"
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <textarea
          className="scope__input"
          rows={3}
          maxLength={2000}
          placeholder="Anything else? The product, your stack, a deadline. (Optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="scope__hp"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <div className="scope__actions">
          <button type="submit" className="btn-primary" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Send it to me →'}
          </button>
          <button type="button" className="scope__ghost" onClick={onEdit}>
            Change answers
          </button>
        </div>
        {state === 'failed' && (
          <p className="scope__error" role="alert">
            {error} You can <a href={mailto}>send it from your email app</a> instead.
          </p>
        )}
      </div>
    </form>
  )
}

export default function Scope() {
  const [answers, setAnswers] = useState({ integrations: [] })
  const [scope, setScope] = useState(null)

  const ready = REQUIRED.every((id) => answers[id])
  // Multi-select questions pass an updater so quick clicks don't drop picks.
  const set = (id) => (value) =>
    setAnswers((a) => ({ ...a, [id]: typeof value === 'function' ? value(a[id]) : value }))

  const build = (e) => {
    e.preventDefault()
    if (!ready) return
    setScope(buildScope(answers))
    requestAnimationFrame(() => document.getElementById('scope')?.scrollIntoView({ behavior: 'smooth' }))
  }

  const edit = () => {
    setScope(null)
    requestAnimationFrame(() => document.getElementById('scope')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <section id="scope" className="section">
      <Reveal className="section__head">
        <div className="kicker">07 — Scope your project</div>
        <h2 className="section__title">Get a first scope in a minute.</h2>
        <p className="section__lead">
          Six quick questions. You get the first-pass scope I'd sketch after an intro call: an
          approach, phases with week ranges, the risks worth planning for, and a sensible first
          step. It's built from my past projects, and nothing is sent anywhere unless you choose
          to send it.
        </p>
      </Reveal>

      <Reveal className="scope">
        {scope ? (
          <>
            <ScopeResult scope={scope} />
            <SendPanel scope={scope} answers={answers} onEdit={edit} />
          </>
        ) : (
          <form className="scope__form" onSubmit={build}>
            {QUESTIONS.map((q) => (
              <Choice key={q.id} question={q} value={answers[q.id]} onChange={set(q.id)} />
            ))}
            <div className="scope__row">
              <button type="submit" className="btn-primary" disabled={!ready}>
                Build my scope →
              </button>
              {!ready && (
                <span className="scope__small">
                  {REQUIRED.filter((id) => !answers[id]).length} question
                  {REQUIRED.filter((id) => !answers[id]).length === 1 ? '' : 's'} to go
                </span>
              )}
            </div>
          </form>
        )}
      </Reveal>
    </section>
  )
}
