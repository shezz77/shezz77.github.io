import { useEffect, useState } from 'react'

// Returns the id of the last section whose top has scrolled above `offset`,
// i.e. the section currently occupying the viewport. `ids` should be a stable
// array (define it at module scope).
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return active
}
