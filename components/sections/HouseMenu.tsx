'use client'

import { useEffect, useRef, useState } from 'react'
import EyebrowText from '@/components/ui/EyebrowText'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const services = [
  {
    num: '01',
    name: 'AI Truth Audit',
    desc: "A $97 diagnostic that shows you exactly how your bar appears — or doesn't — when someone asks ChatGPT, Gemini, or Apple Intelligence for a place to drink near them. Most bar owners are shocked. Start here.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="14" r="8" stroke="var(--brass-dim)" strokeWidth="1" />
        <path d="M16 6v4M16 18v4M8 14h4M20 14h4" stroke="var(--brass-dim)" strokeWidth="1" strokeLinecap="round" />
        <path d="M16 22v4" stroke="var(--brass-dim)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'The House Line',
    desc: "Every missed call is a missed reservation. An AI receptionist trained on your menu, hours, events, and vibe answers every call, texts back every inquiry, and never puts anyone on hold — at any hour, without adding headcount.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 6h8l3 6-4 2a16 16 0 007 7l2-4 6 3v8a2 2 0 01-2 2C10 29 3 22 3 8a2 2 0 012-2z" stroke="var(--brass-dim)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Back Bar Signal',
    desc: 'If you\'re not on the first page of Google and not showing up on AI, you don\'t exist to most people. We handle local SEO, review defense, Google signal updates, and directory sync across 20+ platforms so when someone searches "best bar near me," you\'re the answer.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4" stroke="var(--brass-dim)" strokeWidth="1" />
        <path d="M10 10a8 8 0 000 12M22 10a8 8 0 010 12" stroke="var(--brass-dim)" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 6a16 16 0 000 20M26 6a16 16 0 010 20" stroke="var(--brass-dim)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '04',
    name: 'The Guest List',
    desc: "Every person who walks through your door is a relationship you could own — or lose to Yelp and Instagram. We build the capture system, segment your guests, and run SMS and email campaigns that bring people back for birthdays, slow nights, and everything in between. Your list, your data, your revenue.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="var(--brass-dim)" strokeWidth="1" />
        <path d="M4 12h24" stroke="var(--brass-dim)" strokeWidth="1" />
        <circle cx="12" cy="19" r="3" stroke="var(--brass-dim)" strokeWidth="1" />
        <path d="M18 17h6M18 21h4" stroke="var(--brass-dim)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '05',
    name: 'Web Design',
    desc: '"We have Instagram, we\'re fine." We hear it every week. Instagram is rented space — the algorithm changes, the account gets flagged, and you have no way to reach your audience directly. Your website is yours. Launch Site at $1k. Growth Site at $3k. Authority Site at $5.5k with custom motion and photography that makes people feel the room before they walk in.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="20" rx="2" stroke="var(--brass-dim)" strokeWidth="1" />
        <path d="M2 11h28" stroke="var(--brass-dim)" strokeWidth="1" />
        <circle cx="6" cy="8.5" r="1" fill="var(--brass-dim)" />
        <circle cx="10" cy="8.5" r="1" fill="var(--brass-dim)" />
        <circle cx="14" cy="8.5" r="1" fill="var(--brass-dim)" />
      </svg>
    ),
  },
  {
    num: '06',
    name: 'Brand & Retainers',
    desc: "A logo from Fiverr and a Canva menu aren't a brand. Heritage brand kits, real content photography, and monthly retainers from The Well ($449/mo) to Top Shelf ($2,449/mo) — so every touchpoint, from your front door to your DMs, tells the same story consistently.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="var(--brass-dim)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="16" cy="16" r="6" stroke="var(--brass-dim)" strokeWidth="1" />
        <circle cx="16" cy="16" r="2" fill="var(--brass-dim)" />
      </svg>
    ),
  },
]

export default function HouseMenu() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIdxRef = useRef(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef = useRef<any>(null)
  const [highlightIdx, setHighlightIdx] = useState(0)

  function switchCard(newIdx: number) {
    const gsap = gsapRef.current
    if (!gsap || newIdx === activeIdxRef.current) return
    const oldIdx = activeIdxRef.current
    activeIdxRef.current = newIdx
    setHighlightIdx(newIdx)

    cardRefs.current.forEach((c, ci) => {
      if (c) c.style.zIndex = ci === newIdx ? '2' : '1'
    })

    gsap.to(cardRefs.current[oldIdx], {
      clipPath: 'inset(100% 0 0% 0)',
      duration: 0.5,
      ease: 'power2.in',
      overwrite: 'auto',
    })
    gsap.fromTo(
      cardRefs.current[newIdx],
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power2.out', delay: 0.05, overwrite: 'auto' }
    )
  }

  useEffect(() => {
    const section = sectionRef.current
    const container = listRef.current
    if (!section || !container) return

    let ctx: { revert: () => void } | null = null
    let spotCleanup: (() => void) | undefined

    async function setup() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsapRef.current = gsap

      // Init: card[0] visible, rest clipped below
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.set(card, {
          clipPath: i === 0 ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          zIndex: i === 0 ? 2 : 1,
        })
      })

      ctx = gsap.context(() => {
        // Row entry — init via GSAP so React doesn't fight the opacity
        const rows = container!.querySelectorAll('.hm-row')
        gsap.set(rows, { x: -50, opacity: 0 })
        gsap.to(rows, {
          x: 0,
          opacity: 1,
          stagger: 0.09,
          ease: 'power3.out',
          duration: 0.65,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        // Progress line scrubs with the pin
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${(services.length - 1) * window.innerHeight * 0.75}`,
              scrub: 0.8,
            },
          }
        )

        // Pin section and drive card flips
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: `+=${(services.length - 1) * window.innerHeight * 0.75}`,
          onUpdate: (self) => {
            const newIdx = Math.min(
              services.length - 1,
              Math.floor(self.progress * services.length)
            )
            if (newIdx !== activeIdxRef.current) switchCard(newIdx)
          },
        })
      }, section)

      // Spotlight tracking
      if (spotlightRef.current) {
        const spot = spotlightRef.current
        gsap.set(spot, { xPercent: -50, yPercent: -50, opacity: 0 })

        const onMove = (e: MouseEvent) => {
          const rect = container!.getBoundingClientRect()
          gsap.to(spot, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          gsap.to(spot, { opacity: 1, duration: 0.15 })
        }
        const onLeave = () => gsap.to(spot, { opacity: 0, duration: 0.4 })

        container!.addEventListener('mousemove', onMove)
        container!.addEventListener('mouseleave', onLeave)
        spotCleanup = () => {
          container!.removeEventListener('mousemove', onMove)
          container!.removeEventListener('mouseleave', onLeave)
        }
      }
    }

    setup()
    return () => {
      ctx?.revert()
      spotCleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 5% 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            flexShrink: 0,
          }}
        >
          <div style={{ flex: '1 1 280px' }}>
            <EyebrowText>The House Menu</EyebrowText>
            <div
              style={{
                fontFamily: "'Oi', serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--text-primary)',
                marginTop: '0.5rem',
              }}
            >
              <AnimatedHeading as="h2" trigger={true}>
                What we pour.
              </AnimatedHeading>
            </div>
          </div>

          <div style={{ flex: '0 0 auto', width: 'clamp(100px, 14vw, 180px)', pointerEvents: 'none' }}>
            <video
              autoPlay loop muted playsInline
              style={{ width: '100%', height: 'auto', display: 'block', mixBlendMode: 'screen' }}
            >
              <source src="/tvtendermp4.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            flex: 1,
            minHeight: 0,
            alignItems: 'start',
          }}
        >
          {/* Left — service list */}
          <div ref={listRef} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
            {/* Spotlight glow */}
            <div
              ref={spotlightRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
                left: 0,
                top: 0,
              }}
            />

            {/* Vertical progress line */}
            <div
              ref={progressLineRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '1px',
                height: '100%',
                background: 'linear-gradient(to bottom, var(--brass-dim), var(--brass))',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
              }}
            />

            {services.map((service, i) => (
              <div
                key={service.num}
                className="hm-row"
                onMouseEnter={() => setHighlightIdx(i)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  padding: '1.05rem 0',
                  borderBottom: '1px solid rgba(184,134,11,0.08)',
                  cursor: 'default',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: highlightIdx === i ? 'var(--brass)' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                    minWidth: '2rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {service.num}
                </span>

                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    color: highlightIdx === i ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                >
                  {service.name}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      background: 'var(--brass)',
                      transform: highlightIdx === i ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </span>
              </div>
            ))}
          </div>

          {/* Right — clip-path stacked service cards */}
          <div
            style={{
              position: 'relative',
              height: 'clamp(340px, 42vh, 460px)',
              alignSelf: 'start',
              top: '0.5rem',
            }}
          >
            {services.map((service, i) => (
              <div
                key={service.num}
                ref={el => { cardRefs.current[i] = el }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '2rem',
                  background: 'var(--card-surface)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ marginBottom: '1.25rem', opacity: 0.6 }}>{service.icon}</div>

                <p
                  style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--brass-light)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {service.num} — Service
                </p>

                <h3
                  style={{
                    fontFamily: "'Oi', serif",
                    fontSize: '1.65rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.2,
                  }}
                >
                  {service.name}
                </h3>

                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.75,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
