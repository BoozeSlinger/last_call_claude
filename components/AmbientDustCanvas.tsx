'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  phase: number
  alpha: number
  radius: number
}

const REPEL_RADIUS = 140
const REPEL_STRENGTH = 3.5
const PARTICLE_COUNT = 320

function createParticle(w: number, h: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = 0.08 + Math.random() * 0.18
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    baseVx: Math.cos(angle) * speed,
    baseVy: Math.sin(angle) * speed,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.12 + Math.random() * 0.3,
    radius: 0.7 + Math.random() * 1.8,
  }
}

export default function AmbientDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

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
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(w, h))
    }

    init()

    const handleResize = () => init()
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('mouseleave', handleLeave)

    function animate() {
      if (!ctx) return
      frameCountRef.current++
      const frame = frameCountRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        // Gentle drift oscillation
        const wobble = Math.sin(frame * 0.007 + p.phase) * 0.35
        p.vx = p.baseVx + Math.cos(p.phase) * wobble * 0.15
        p.vy = p.baseVy + wobble * 0.1

        // Mouse repulsion — "crowd parts for you" effect
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < REPEL_RADIUS * REPEL_RADIUS && dist2 > 0.01) {
          const dist = Math.sqrt(dist2)
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH
          p.vx += (dx / dist) * force * 0.12
          p.vy += (dy / dist) * force * 0.12
        }

        p.x += p.vx
        p.y += p.vy

        // Drift back toward base velocity
        p.vx += (p.baseVx - p.vx) * 0.04
        p.vy += (p.baseVy - p.vy) * 0.04

        // Wrap edges
        if (p.x < -2) p.x = w + 2
        if (p.x > w + 2) p.x = -2
        if (p.y < -2) p.y = h + 2
        if (p.y > h + 2) p.y = -2

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184,134,60,${p.alpha})`
        ctx.fill()
      }

      // Ambient atmosphere gradient
      const radius = Math.max(w, h) * 0.7
      const grad = ctx.createRadialGradient(w * 0.65, h * 0.4, 0, w * 0.65, h * 0.4, radius)
      grad.addColorStop(0, 'rgba(120,80,20,0.1)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', handleLeave)
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
