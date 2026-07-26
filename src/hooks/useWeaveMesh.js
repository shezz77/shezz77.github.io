import { useEffect, useRef } from 'react'

// Hero canvas effect = the always-on animated perspective grid PLUS an
// interactive "weave" mesh layered on top that follows the cursor.
//
// Base layer (always running): vertical lines skew with the pointer, horizontal
// lines scroll upward with an accent line every 5th row.
// Weave layer (on hover): the grid's own intersection points — sharing the same
// skew + scroll transform, so the two stay in sync — are pulled magnetically
// toward the cursor and linked into a fabric-like mesh that fades in/out.
//
// Tunables: R (influence radius), PULL (pull strength), LINK (max link distance).
export function useWeaveMesh() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const host = canvas.parentElement
    if (!ctx || !host) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const GAP = 58 // grid spacing (shared by base grid + weave)
    const SKEW_MAX = 44 // horizontal skew of verticals at the edges
    const SCROLL = 0.3 // upward scroll per frame
    const R = 175 // radius of cursor influence
    const PULL = 0.28 // pull strength toward cursor
    const LINK = GAP * 1.5 // max link distance
    const AMBER = '224,164,88' // weave dots
    const RUST = '191,59,36' // weave links + accent rows

    let W = 0
    let H = 0
    let off = 0 // vertical scroll offset
    let raf = null

    let mx = 0.5 // normalized pointer x -> drives skew (persists like the base grid)
    const mouse = { x: -9999, y: -9999 } // pixel pointer -> drives the weave
    let strength = 0 // eased 0..1 presence of the weave
    let target = 0 // 1 while pointer is over the header, else 0

    const resize = () => {
      const r = host.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e) => {
      const r = host.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mx = mouse.x / W
      target = 1
    }
    const onLeave = () => {
      target = 0
    }

    const paint = (animate) => {
      ctx.clearRect(0, 0, W, H)
      if (animate) off = (off + SCROLL) % GAP
      strength += (target - strength) * 0.08

      const skew = (mx - 0.5) * SKEW_MAX

      // --- Base grid: skewing verticals ---
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(107,100,86,0.08)'
      for (let x = -GAP; x < W + GAP; x += GAP) {
        ctx.beginPath()
        ctx.moveTo(x + skew, 0)
        ctx.lineTo(x - skew, H)
        ctx.stroke()
      }

      // --- Base grid: scrolling horizontals with accent every 5th row ---
      let row = 0
      for (let y = -GAP; y < H + GAP; y += GAP) {
        const yy = y + off
        ctx.strokeStyle = row % 5 === 0 ? 'rgba(191,59,36,0.14)' : 'rgba(107,100,86,0.08)'
        ctx.beginPath()
        ctx.moveTo(0, yy)
        ctx.lineTo(W, yy)
        ctx.stroke()
        row++
      }

      // --- Weave layer: intersections of the SAME animated grid ---
      // Vertical line at base x is at screen x = x + skew*(1 - 2*yy/H); a
      // horizontal at yy = y + off. That gives the exact grid crossing points,
      // so the weave rides on top of the base grid perfectly in sync.
      if (strength <= 0.01) return

      const R2 = R * R
      const pts = []
      for (let x = -GAP; x < W + GAP; x += GAP) {
        for (let y = -GAP; y < H + GAP; y += GAP) {
          const yy = y + off
          const xx = x + skew * (1 - (2 * yy) / H)
          const dx = mouse.x - xx
          const dy = mouse.y - yy
          const d2 = dx * dx + dy * dy
          if (d2 >= R2) continue
          const d = Math.sqrt(d2) || 0.0001
          const f = 1 - d / R // 1 at cursor -> 0 at edge
          const pull = f * PULL * strength
          pts.push({ x: xx + dx * pull, y: yy + dy * pull, f })
        }
      }

      // Weave: link every pair of pulled points closer than LINK.
      for (let a = 0; a < pts.length; a++) {
        const pa = pts[a]
        for (let b = a + 1; b < pts.length; b++) {
          const pb = pts[b]
          const dx = pa.x - pb.x
          const dy = pa.y - pb.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK) {
            const op = Math.min(pa.f, pb.f) * 0.4 * strength
            ctx.strokeStyle = `rgba(${RUST},${op})`
            ctx.beginPath()
            ctx.moveTo(pa.x, pa.y)
            ctx.lineTo(pb.x, pb.y)
            ctx.stroke()
          }
        }
      }

      // Amber dots for the pulled points, brightest under the cursor.
      for (let a = 0; a < pts.length; a++) {
        const p = pts[a]
        const op = (0.3 + p.f * 0.6) * strength
        ctx.fillStyle = `rgba(${AMBER},${op})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4 + p.f * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    resize()
    window.addEventListener('resize', resize)
    host.addEventListener('mousemove', onMove)
    host.addEventListener('mouseleave', onLeave)

    if (prefersReduced) {
      paint(false) // single static frame (base grid only)
    } else {
      const draw = () => {
        paint(true)
        raf = requestAnimationFrame(draw)
      }
      draw()
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      host.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return canvasRef
}
