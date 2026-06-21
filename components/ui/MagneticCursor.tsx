'use client'

import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let innerCleanup: (() => void) | undefined

    async function init() {
      const { default: gsap } = await import('gsap')

      gsap.set([dot!, ring!], { xPercent: -50, yPercent: -50 })

      const qDotX = gsap.quickTo(dot!, 'x', { duration: 0.08, ease: 'none' })
      const qDotY = gsap.quickTo(dot!, 'y', { duration: 0.08, ease: 'none' })
      const qRingX = gsap.quickTo(ring!, 'x', { duration: 0.5, ease: 'power3.out' })
      const qRingY = gsap.quickTo(ring!, 'y', { duration: 0.5, ease: 'power3.out' })

      let shown = false

      const onMove = (e: MouseEvent) => {
        qDotX(e.clientX)
        qDotY(e.clientY)
        qRingX(e.clientX)
        qRingY(e.clientY)
        if (!shown) {
          shown = true
          gsap.to([dot!, ring!], { opacity: 1, duration: 0.4 })
        }
      }

      const onEnter = () => {
        gsap.to(ring!, { scale: 2.4, opacity: 0.8, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        gsap.to(dot!, { scale: 0, duration: 0.2, overwrite: 'auto' })
      }

      const onLeave = () => {
        gsap.to(ring!, { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
        gsap.to(dot!, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
      }

      window.addEventListener('mousemove', onMove)

      let els: NodeListOf<Element> | undefined
      const t = setTimeout(() => {
        els = document.querySelectorAll('a, button, [data-cursor-hover]')
        els.forEach(el => {
          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
        })
      }, 600)

      return () => {
        clearTimeout(t)
        window.removeEventListener('mousemove', onMove)
        els?.forEach(el => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
        })
      }
    }

    init().then(fn => { innerCleanup = fn })

    return () => innerCleanup?.()
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--brass)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(184,134,11,0.7)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
