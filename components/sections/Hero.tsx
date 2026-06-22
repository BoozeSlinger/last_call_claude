'use client'

import { useEffect, useRef, useState } from 'react'
import EyebrowText from '@/components/ui/EyebrowText'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import Button from '@/components/ui/Button'
import IceCubeHero from '@/components/IceCubeHero'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ringBLRef = useRef<HTMLDivElement>(null)
  const ringTRRef = useRef<HTMLDivElement>(null)
  const magneticWrapRef = useRef<HTMLDivElement>(null)
  const magneticBtnRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function animate() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '+=0.4')
        .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo(trustRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

      // Parallax depth on decorative rings
      if (ringBLRef.current && sectionRef.current) {
        gsap.to(ringBLRef.current, {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
      if (ringTRRef.current && sectionRef.current) {
        gsap.to(ringTRRef.current, {
          y: 80,
          x: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }
    }
    animate()
  }, [])

  // Magnetic CTA button
  useEffect(() => {
    if (!magneticWrapRef.current || !magneticBtnRef.current) return

    const wrap = magneticWrapRef.current
    const btn = magneticBtnRef.current
    let cleanup: (() => void) | undefined

    async function setup() {
      const { default: gsap } = await import('gsap')

      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, ease: 'power2.out', duration: 0.3, overwrite: 'auto' })
      }
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, ease: 'elastic.out(1, 0.4)', duration: 0.6, overwrite: 'auto' })
      }

      wrap.addEventListener('mousemove', onMove)
      wrap.addEventListener('mouseleave', onLeave)

      return () => {
        wrap.removeEventListener('mousemove', onMove)
        wrap.removeEventListener('mouseleave', onLeave)
      }
    }

    setup().then(fn => { cleanup = fn })
    return () => cleanup?.()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '10rem' }}
    >
      {/* Cinematic full-bleed video background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            mixBlendMode: 'screen',
            opacity: 0.18,
          }}
        >
          <source src="/The All Seeing Ice.mp4" type="video/mp4" />
        </video>
        {/* Radial vignette so edges don't compete with text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(17,16,9,0.85) 100%)',
          }}
        />
      </div>

      {/* WebGL ice cube — all-seeing eye showpiece */}
      <IceCubeHero />

      {/* Bottom-left decorative ring */}
      <div
        ref={ringBLRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          animation: 'heroCwSpin 60s linear infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
          <circle cx="160" cy="160" r="155" stroke="rgba(184,134,11,0.2)" strokeWidth="1.5" />
          <circle cx="160" cy="160" r="120" stroke="rgba(184,134,11,0.1)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Top-right decorative ring */}
      <div
        ref={ringTRRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          animation: 'heroCcwSpin 45s linear infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="95" stroke="rgba(184,134,11,0.15)" strokeWidth="1" />
        </svg>
      </div>

      {/* Main content */}
      <div className="w-full max-w-[860px] mx-auto text-center relative" style={{ zIndex: 1 }}>
        <div ref={eyebrowRef} style={{ opacity: 0, marginBottom: '1.5rem' }}>
          <EyebrowText>Digital Agency · Bar &amp; Hospitality</EyebrowText>
        </div>

        {/* Wrapper applies the Oi font + size — AnimatedHeading receives className only */}
        <div
          style={{
            fontFamily: "'Oi', serif",
            fontSize: 'clamp(3.2rem, 7vw, 7rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
        >
          <AnimatedHeading as="h1" trigger={false}>
            High Proof Design &amp; AI That Works the Late Shift.
          </AnimatedHeading>
        </div>

        <p
          ref={subRef}
          style={{
            opacity: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            maxWidth: '540px',
            margin: '0 auto 1.25rem',
            lineHeight: 1.6,
          }}
        >
          The digital partner for hospitality brands that play to win.
        </p>

        <p
          ref={bodyRef}
          style={{
            opacity: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            letterSpacing: '0.01em',
          }}
        >
          Iconic design.&nbsp; Bar-built AI.&nbsp; Less busywork. More profit.
        </p>

        <div ref={ctaRef} style={{ opacity: 0, marginBottom: '1.5rem' }}>
          {/* Magnetic field — wider than the button so mouse proximity kicks in early */}
          <div
            ref={magneticWrapRef}
            style={{ display: 'inline-block', padding: '40px', margin: '-40px' }}
          >
            <div ref={magneticBtnRef} style={{ display: 'inline-block' }}>
              <Button
                variant="brass"
                size="lg"
                className="group"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Let&apos;s Build
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid currentColor',
                    flexShrink: 0,
                    transition: 'transform 0.5s ease',
                  }}
                  className="group-hover:rotate-[360deg]"
                >
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="2.5" fill="currentColor" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Brass accent line */}
        <div
          aria-hidden="true"
          style={{
            width: '80px',
            height: '1px',
            background: 'var(--brass-dim)',
            margin: '0 auto 1.25rem',
          }}
        />

        <p
          ref={trustRef}
          style={{
            opacity: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}
        >
          Trusted by bars across the IE &amp; East LA
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: scrolled ? 0 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: scrolled ? 'none' : 'auto',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{ animation: 'heroBounce 1.5s ease-in-out infinite' }}
        >
          <path
            d="M8 4L8 20M8 20L2 14M8 20L14 14"
            stroke="var(--brass-dim)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes heroBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        @keyframes heroCwSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroCcwSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}
