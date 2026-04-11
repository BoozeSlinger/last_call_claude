'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  speed: number
  angle: number
  phase: number
  alpha: number
  radius: number
}

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    speed: 0.08 + Math.random() * 0.17,
    angle: Math.random() * Math.PI * 2,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.15 + Math.random() * 0.35,
    radius: 0.8 + Math.random() * 1.7,
  }
}

export default function AmbientDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight

    function init() {
      if (!canvas) return
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
      const count = 100 + Math.floor(Math.random() * 21)
      particlesRef.current = Array.from({ length: count }, () => createParticle(w, h))
    }

    init()

    function handleResize() {
      init()
    }
    window.addEventListener('resize', handleResize)

    function animate() {
      if (!ctx) return
      frameCountRef.current++
      const frame = frameCountRef.current

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current

      for (const p of particles) {
        const wobble = Math.sin(frame * 0.008 + p.phase) * 0.4
        // drift along angle, wobble perpendicular (angle + PI/2)
        p.x += Math.cos(p.angle) * p.speed + Math.cos(p.angle + Math.PI / 2) * wobble
        p.y += Math.sin(p.angle) * p.speed + Math.sin(p.angle + Math.PI / 2) * wobble

        // wrap edges
        if (p.x < -2) p.x = w + 2
        if (p.x > w + 2) p.x = -2
        if (p.y < -2) p.y = h + 2
        if (p.y > h + 2) p.y = -2

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184,134,60,${p.alpha})`
        ctx.fill()
      }

      // Radial gradient atmosphere overlay
      const radius = Math.max(w, h) * 0.7
      const gx = w * 0.65
      const gy = h * 0.4
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius)
      grad.addColorStop(0, 'rgba(120,80,20,0.12)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', handleResize)
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
      }}
    />
  )
}
