import { useEffect, useRef, useState } from 'react'
import { terminalLines } from '../data'

// Typewriter terminal: types each scripted line char-by-char, pauses, then
// loops from the top. Ported from the source design's _initTerminal().
export default function Terminal() {
  const [done, setDone] = useState([]) // fully-typed lines: { s, c }
  const [current, setCurrent] = useState(null) // line being typed: { s, c }
  const timer = useRef(null)

  useEffect(() => {
    let li = 0
    setDone([])
    setCurrent(null)

    const run = () => {
      if (li >= terminalLines.length) {
        timer.current = setTimeout(() => {
          setDone([])
          setCurrent(null)
          li = 0
          run()
        }, 3000)
        return
      }
      const spec = terminalLines[li]
      let ci = 0
      const step = () => {
        setCurrent({ s: spec.s.slice(0, ci), c: spec.c })
        ci++
        if (ci <= spec.s.length) {
          timer.current = setTimeout(step, spec.c === 'cmd' ? 42 : 16)
        } else {
          setDone((prev) => [...prev, spec])
          setCurrent(null)
          li++
          timer.current = setTimeout(run, spec.c === 'cmd' ? 250 : 500)
        }
      }
      step()
    }

    run()
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className="term">
      <div className="term__bar">
        <span className="term__dot term__dot--r" />
        <span className="term__dot term__dot--y" />
        <span className="term__dot term__dot--g" />
        <span className="term__label">~/architecture — zsh</span>
      </div>
      <div className="term__body">
        {done.map((line, i) => (
          <div key={i} className={`term__line term__line--${line.c}`}>
            {line.s}
          </div>
        ))}
        {current && (
          <div className={`term__line term__line--${current.c}`}>{current.s}</div>
        )}
        <span className="term__cursor" aria-hidden="true" />
      </div>
    </div>
  )
}
