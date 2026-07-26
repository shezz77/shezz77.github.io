import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

// Counts a numeric prefix up from 0 to its target when scrolled into view,
// preserving any suffix (e.g. "8+"). Non-numeric values (e.g. "Gold") render
// unchanged. Honors prefers-reduced-motion.
export default function CountUp({ value, duration = 2200 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const match = String(value).match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (target === null || !inView || started.current) return
    started.current = true

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setN(target)
      return
    }

    let raf
    let start
    const tick = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 1.5) // gentle ease-out — keeps the counting visible throughout
      setN(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return <span ref={ref}>{target === null ? value : `${n}${suffix}`}</span>
}
