'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  phaseX: number
  phaseY: number
  freqX: number
  freqY: number
  repelX: number
  repelY: number
}

interface DustCanvasProps {
  opacity?: number
}

const COLORS = ['#2a2420', '#b8860b', '#8b6914', '#3d3028', '#c9a84c']
const CONNECTION_DISTANCE = 90
const REPEL_DISTANCE = 120
const LERP_FACTOR = 0.05

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function createParticle(w: number, h: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = randomBetween(0.08, 0.25)
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: randomBetween(0.8, 2.2),
    opacity: randomBetween(0.12, 0.55),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    freqX: randomBetween(0.003, 0.012),
    freqY: randomBetween(0.003, 0.012),
    repelX: 0,
    repelY: 0,
  }
}

export default function DustCanvas({ opacity = 1 }: DustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 })
  const frameCountRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight

    canvas.width = w
    canvas.height = h

    const count = Math.floor(randomBetween(280, 340))
    particlesRef.current = Array.from({ length: count }, () => createParticle(w, h))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const observer = new ResizeObserver(() => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    })
    observer.observe(document.documentElement)

    function animate() {
      if (!ctx) return
      frameCountRef.current++
      const frame = frameCountRef.current

      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const particles = particlesRef.current

      // Update positions
      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_DISTANCE && dist > 0) {
          const force = ((REPEL_DISTANCE - dist) / REPEL_DISTANCE) * 1.5
          p.repelX += (dx / dist) * force
          p.repelY += (dy / dist) * force
        }

        p.repelX *= (1 - LERP_FACTOR)
        p.repelY *= (1 - LERP_FACTOR)

        p.x += p.vx + Math.sin(frame * p.freqX + p.phaseX) * 0.3 + p.repelX * 0.4
        p.y += p.vy + Math.sin(frame * p.freqY + p.phaseY) * 0.3 + p.repelY * 0.4

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = 0.06 * (1 - dist / CONNECTION_DISTANCE)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(184,134,11,${alpha.toFixed(3)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity,
      }}
    />
  )
}
