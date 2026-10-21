import { useEffect, useState } from 'react'
import Reveal from './Reveal'

// The scoping agent. A visitor describes a project, answers up to three
// clarifying questions, and gets a one-page scope back from /api/scope.php
// (server/scope.php). The server is stateless: every request carries the
// whole conversation so far.

const ENDPOINT = '/api/scope.php'
const EMAIL = 'shezz77.se@gmail.com'

const EXAMPLES = [
  'We get ~300 support emails a day. I want an agent that tags them, routes them to the right team and drafts replies for us to approve. We use Zendesk.',
  'Our Laravel monolith is slowing down as we grow. Deploys are manual and scary. We want to know whether to split it into services or fix what we have.',
  'I run a small recruitment agency and want an internal tool that matches CVs to open roles and explains each match.',
]

const SCOPING_STEPS = [
  'Reading your description',
  'Sketching an approach',
  'Breaking it into phases',
  'Looking for the risks',
  'Writing it up',
]

const FIT_LABEL = {
  strong: 'Strong fit',
  partial: 'Partial fit',
  outside: 'Outside my work',
}

function readRef() {
  try {
    return sessionStorage.getItem('shezz77:ref') || ''
  } catch {
    return ''
  }
}

async function callAgent(body) {
  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error("Couldn't reach the agent. Check your connection, or email me.")
  }
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) {
    throw new Error(data?.error || "The agent isn't available here. Email me instead.")
  }
  return data
}

function scopeAsText(scope, id) {
  const lines = [
    `${scope.title} (${FIT_LABEL[scope.fit] || scope.fit})`,
    '',
    scope.summary,
    '',
    'Approach',
    ...scope.approach.map((step, i) => `${i + 1}. ${step}`),
    '',
    'Phases',
    ...scope.phases.map((p) => `- ${p.name} (${p.weeks} weeks): ${p.deliverable}`),
    '',
    'Risks',
    ...scope.risks.map((r) => `- ${r.risk}. ${r.mitigation}`),
    '',
    `First step: ${scope.first_step}`,
  ]
  if (id) lines.push('', `Scope ID: ${id}`)
  return lines.join('\n')
}

function Working({ steps }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, steps.length - 1)), 4500)
    return () => clearInterval(t)
  }, [steps])
  return (
    <div className="scope__working" role="status" aria-live="polite">
      <span className="scope__spinner" aria-hidden="true" />
      {steps[i]}…
    </div>
  )
}

function ScopeResult({ scope, id, sent, onReset }) {
  const [copied, setCopied] = useState(false)
  const text = scopeAsText(scope, id)
  const subject = `Scope: ${scope.title}`
  const body = `Hi Shehzad,\n\nI used the scoping agent on your site (ID ${id}). Here's what it came back with:\n\n${text}\n\n`
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.slice(0, 1800))}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked; the scope is still on screen */
    }
  }

  return (
    <article className="scope__result">
      <header className="scope__result-head">
        <span className={`scope__fit scope__fit--${scope.fit}`}>{FIT_LABEL[scope.fit] || scope.fit}</span>
        <h3 className="scope__result-title">{scope.title}</h3>
        <p className="scope__summary">{scope.summary}</p>
        <p className="scope__fit-note">{scope.fit_note}</p>
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
                <span className="scope__weeks">{p.weeks} wk</span>
                <span>
                  <strong>{p.name}</strong>
                  <br />
                  {p.deliverable}
                </span>
              </li>
            ))}
          </ul>
          <p className="scope__small">Weeks of one senior engineer. A short call narrows the range.</p>
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

      {scope.assumptions.length > 0 && (
        <section>
          <h4 className="scope__h">Assumed</h4>
          <ul className="scope__assumptions">
            {scope.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="scope__next">
        <div>
          <div className="scope__h">Suggested first step</div>
          <p className="scope__first">{scope.first_step}</p>
        </div>
        <div className="scope__actions">
          {sent ? (
            <p className="scope__sent">Sent. I'll reply personally, usually within a day.</p>
          ) : (
            <a href={mailto} className="btn-primary">
              Send this to me →
            </a>
          )}
          <button type="button" className="scope__ghost" onClick={copy}>
            {copied ? 'Copied' : 'Copy scope'}
          </button>
          <button type="button" className="scope__ghost" onClick={onReset}>
            Scope another
          </button>
        </div>
      </div>
      <p className="scope__small">
        Written by an AI agent from your description, and reviewed by me before any real proposal.
      </p>
    </article>
  )
}

export default function Scope() {
  const [phase, setPhase] = useState('describe') // describe | asking | clarify | scoping | done
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const base = () => ({ description, website, ref: readRef() })

  const writeScope = async (qs, as) => {
    setPhase('scoping')
    setError('')
    try {
      const data = await callAgent({
        ...base(),
        stage: 'scope',
        answers: qs.map((q, i) => ({ question: q.question, answer: as[i] || '' })),
        name,
        email,
      })
      setResult(data)
      setPhase('done')
    } catch (e) {
      setError(e.message)
      setPhase(qs.length ? 'clarify' : 'describe')
    }
  }

  const submitDescription = async (e) => {
    e.preventDefault()
    if (description.trim().length < 40) {
      setError('Tell me a bit more: a few sentences about what you want to build and why.')
      return
    }
    setPhase('asking')
    setError('')
    try {
      const data = await callAgent({ ...base(), stage: 'clarify' })
      const qs = data.questions || []
      setQuestions(qs)
      setAnswers(qs.map(() => ''))
      if (qs.length) setPhase('clarify')
      else await writeScope([], [])
    } catch (err) {
      setError(err.message)
      setPhase('describe')
    }
  }

  const submitAnswers = (e) => {
    e.preventDefault()
    writeScope(questions, answers)
  }

  const reset = () => {
    setPhase('describe')
    setQuestions([])
    setAnswers([])
    setResult(null)
    setError('')
  }

  const busy = phase === 'asking' || phase === 'scoping'

  return (
    <section id="scope" className="section">
      <Reveal className="section__head">
        <div className="kicker">07 — Scope your project</div>
        <h2 className="section__title">Get a first scope in two minutes.</h2>
        <p className="section__lead">
          Describe what you want to build. My scoping agent asks a few questions, then writes the
          one-page scope I'd give you after a first call: approach, phases, risks and a sensible
          first step. It's an AI agent, which is also a fair sample of what I build.
        </p>
      </Reveal>

      <Reveal className="scope">
        {phase === 'done' && result ? (
          <ScopeResult scope={result.scope} id={result.id} sent={result.sent} onReset={reset} />
        ) : (
          <>
            <form className="scope__form" onSubmit={submitDescription}>
              <label className="scope__label" htmlFor="scope-description">
                What do you want to build?
              </label>
              <textarea
                id="scope-description"
                className="scope__textarea"
                rows={6}
                maxLength={4000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={phase !== 'describe'}
                placeholder="What it should do, who uses it, what you have today, and any deadline."
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
              {phase === 'describe' && (
                <>
                  <div className="scope__examples">
                    <span className="scope__small">Or start from an example:</span>
                    {EXAMPLES.map((ex) => (
                      <button type="button" key={ex} className="scope__chip" onClick={() => setDescription(ex)}>
                        {ex.split('.')[0]}
                      </button>
                    ))}
                  </div>
                  <div className="scope__row">
                    <button type="submit" className="btn-primary">
                      Scope it →
                    </button>
                    <span className="scope__small">{description.length}/4000</span>
                  </div>
                </>
              )}
            </form>

            {phase === 'asking' && <Working steps={['Reading your description', 'Working out what to ask']} />}

            {(phase === 'clarify' || (phase === 'scoping' && questions.length > 0)) && (
              <form className="scope__form scope__clarify" onSubmit={submitAnswers}>
                <p className="scope__label">A few questions that would change the scope:</p>
                {questions.map((q, i) => (
                  <div className="scope__q" key={q.question}>
                    <label htmlFor={`scope-q${i}`}>{q.question}</label>
                    <span className="scope__small">{q.why}</span>
                    <input
                      id={`scope-q${i}`}
                      className="scope__input"
                      maxLength={1200}
                      value={answers[i]}
                      disabled={busy}
                      onChange={(e) => setAnswers(answers.map((a, j) => (j === i ? e.target.value : a)))}
                      placeholder="Skip if you're not sure"
                    />
                  </div>
                ))}
                <div className="scope__contact">
                  <input
                    className="scope__input"
                    placeholder="Your name (optional)"
                    autoComplete="name"
                    maxLength={120}
                    value={name}
                    disabled={busy}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="scope__input"
                    type="email"
                    placeholder="Email (optional, so I can reply)"
                    autoComplete="email"
                    maxLength={200}
                    value={email}
                    disabled={busy}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {phase === 'clarify' && (
                  <div className="scope__row">
                    <button type="submit" className="btn-primary">
                      Write my scope →
                    </button>
                    <button type="button" className="scope__ghost" onClick={reset}>
                      Edit description
                    </button>
                  </div>
                )}
              </form>
            )}

            {phase === 'scoping' && <Working steps={SCOPING_STEPS} />}

            {error && (
              <p className="scope__error" role="alert">
                {error} <a href={`mailto:${EMAIL}?subject=Project%20scope`}>{EMAIL}</a>
              </p>
            )}

            <p className="scope__small scope__privacy">
              Your description is sent to Anthropic's Claude API to write the scope, and saved so I
              can follow up. Don't include passwords or confidential data.
            </p>
          </>
        )}
      </Reveal>
    </section>
  )
}
