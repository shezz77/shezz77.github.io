import { useEffect, useState } from 'react'

// True once the page has scrolled past the threshold — drives the nav's
// transparent-to-solid transition.
export function useScrollNav(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
