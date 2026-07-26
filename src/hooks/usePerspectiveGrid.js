import { useEffect, useRef } from 'react'

// Animated perspective grid on a canvas filling its parent: verticals skew with
// the cursor, horizontals scroll upward with an accent line every 5th row.
// Ported from the source design's _initGrid().
export function usePerspectiveGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const host = canvas.parentElement
    if (!ctx || !host) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    let off = 0
    let raf = null
    const mouse = { x: 0.5, y: 0.5 }
    const GAP = 58

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
      mouse.x = (e.clientX - r.left) / W
      mouse.y = (e.clientY - r.top) / H
    }

    const paint = (animate) => {
      ctx.clearRect(0, 0, W, H)
      if (animate) off = (off + 0.3) % GAP
      const skew = (mouse.x - 0.5) * 44
      ctx.lineWidth = 1
      for (let x = -GAP; x < W + GAP; x += GAP) {
        ctx.strokeStyle = 'rgba(107,100,86,0.08)'
        ctx.beginPath()
        ctx.moveTo(x + skew, 0)
        ctx.lineTo(x - skew, H)
        ctx.stroke()
      }
      let row = 0
      for (let y = -GAP; y < H + GAP; y += GAP) {
        const yy = y + off
        const accent = row % 5 === 0
        ctx.strokeStyle = accent ? 'rgba(191,59,36,0.14)' : 'rgba(107,100,86,0.08)'
        ctx.beginPath()
        ctx.moveTo(0, yy)
        ctx.lineTo(W, yy)
        ctx.stroke()
        row++
      }
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    resize()
    window.addEventListener('resize', resize)
    host.addEventListener('mousemove', onMove)

    if (prefersReduced) {
      paint(false) // draw a single static frame
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
    }
  }, [])

  return canvasRef
}
