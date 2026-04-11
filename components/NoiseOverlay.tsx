'use client'

import { useEffect, useRef } from 'react'

// ─── Minimal inline 2D Simplex Noise — zero external dependencies ───────────

const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0

const GRAD2: [number, number][] = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1],  [0, -1],
]

const perm  = new Uint8Array(512)
const gradP = new Array<[number, number]>(512)

function seedNoise(): void {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = p[i]; p[i] = p[j]; p[j] = tmp
  }
  for (let i = 0; i < 512; i++) {
    perm[i]  = p[i & 255]
    gradP[i] = GRAD2[perm[i] & 7]
  }
}

function simplex2(xin: number, yin: number): number {
  const s  = (xin + yin) * F2
  const i  = Math.floor(xin + s)
  const j  = Math.floor(yin + s)
  const t  = (i + j) * G2
  const x0 = xin - (i - t)
  const y0 = yin - (j - t)
  const i1 = x0 > y0 ? 1 : 0
  const j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1.0 + 2.0 * G2
  const y2 = y0 - 1.0 + 2.0 * G2
  const ii = i & 255
  const jj = j & 255

  let n0 = 0.0
  const t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 > 0) {
    const tt0 = t0 * t0
    const g0 = gradP[ii + perm[jj]]
    n0 = tt0 * tt0 * (g0[0] * x0 + g0[1] * y0)
  }

  let n1 = 0.0
  const t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 > 0) {
    const tt1 = t1 * t1
    const g1 = gradP[ii + i1 + perm[jj + j1]]
    n1 = tt1 * tt1 * (g1[0] * x1 + g1[1] * y1)
  }

  let n2 = 0.0
  const t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 > 0) {
    const tt2 = t2 * t2
    const g2 = gradP[ii + 1 + perm[jj + 1]]
    n2 = tt2 * tt2 * (g2[0] * x2 + g2[1] * y2)
  }

  return 70.0 * (n0 + n1 + n2) // output range ≈ [-1, 1]
}

// ─── Canvas constants ────────────────────────────────────────────────────────

const CANVAS_W   = 256   // internal resolution — CSS stretches to viewport
const CANVAS_H   = 256
const NOISE_SCALE = 0.5  // ≈15 px grain on a 1920 wide screen after CSS stretch
const TIME_STEP  = 0.00025 // radians per frame for the Lissajous drift
const DRIFT_R    = 10    // noise-space radius of the drift orbit

// ─── Component ───────────────────────────────────────────────────────────────

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    seedNoise()

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = CANVAS_W
    canvas.height = CANVAS_H

    const imageData = ctx.createImageData(CANVAS_W, CANVAS_H)
    const data      = imageData.data
    let theta       = 0

    function draw() {
      // Lissajous drift — circular orbit in noise-space so there's no
      // apparent direction of movement; looks like a living, breathing grain
      const ox = Math.cos(theta)          * DRIFT_R
      const oy = Math.sin(theta * 0.7919) * DRIFT_R // irrational ratio → never repeats

      for (let y = 0; y < CANVAS_H; y++) {
        for (let x = 0; x < CANVAS_W; x++) {
          const n   = simplex2(x * NOISE_SCALE + ox, y * NOISE_SCALE + oy)
          // Map [-1,1] → [90,165]: a narrow mid-grey band so the grain reads
          // as subtle texture rather than harsh black-and-white flicker
          const v   = Math.floor(((n + 1) / 2) * 75 + 90) // 90–165
          const idx = (y * CANVAS_W + x) * 4
          data[idx]     = v
          data[idx + 1] = v
          data[idx + 2] = v
          data[idx + 3] = 255
        }
      }

      ctx!.putImageData(imageData, 0, 0)
      theta += TIME_STEP
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <>
      {/* ── Layer 1: Animated simplex noise grain (behind everything) ──────── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          width:         '100%',
          height:        '100%',
          zIndex:        -1,
          pointerEvents: 'none',
          opacity:       0.06,
          // Let the browser bilinear-scale the 256×256 canvas up smoothly
          imageRendering: 'auto',
        }}
      />

      {/* ── Layer 2: Multiply film overlay — dark radial vignette ──────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          width:         '100%',
          height:        '100%',
          zIndex:        100,
          pointerEvents: 'none',
          mixBlendMode:  'multiply',
          background:    'radial-gradient(ellipse 120% 120% at 50% 50%, rgba(22,14,4,0.55) 0%, rgba(8,5,2,0.75) 100%)',
          opacity:       0.13,
        }}
      />

      {/* ── Layer 3: Page transition swipe panel ───────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        50,
          pointerEvents: 'none',
        }}
      >
        <div
          className="swipe-panel"
          style={{
            position:   'absolute',
            inset:      0,
            willChange: 'transform',
            transform:  'translate3d(-100%, 0, 0)',
            background: 'var(--bg)',
          }}
        />
      </div>
    </>
  )
}
