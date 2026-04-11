'use client'

import { useEffect, useRef, useState } from 'react'
import EyebrowText from '@/components/ui/EyebrowText'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const services = [
  {
    num: '01',
    name: 'AI Truth Audit',
    desc: 'A $97 diagnostic that shows you exactly how your bar appears — or doesn\'t — when someone asks ChatGPT, Gemini, or Apple Intelligence for a place to drink near them. Most bar owners are shocked. Start here.',
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
    desc: 'Every missed call is a missed reservation. An AI receptionist trained on your menu, hours, events, and vibe answers every call, texts back every inquiry, and never puts anyone on hold — at any hour, without adding headcount.',
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
    desc: 'Every person who walks through your door is a relationship you could own — or lose to Yelp and Instagram. We build the capture system, segment your guests, and run SMS and email campaigns that bring people back for birthdays, slow nights, and everything in between. Your list, your data, your revenue.',
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
    desc: '"We have Instagram, we\'re fine." We hear it every week. Instagram is rented space — the algorithm changes, the account gets flagged, and you have no way to reach your audience directly. Your website is yours. Launch Site at $1k. Growth Site at $3k — takes reservations, shows up in search. Authority Site at $5.5k with custom motion and photography that makes people feel the room before they walk in.',
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
    desc: 'A logo from Fiverr and a Canva menu aren\'t a brand. Heritage brand kits, real content photography, and monthly retainers from The Well ($449/mo) to Top Shelf ($2,449/mo) — so every touchpoint, from your front door to your DMs, tells the same story consistently.',
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
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = listRef.current
    if (!container) return

    let ctx: { revert: () => void } | null = null

    async function setup() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const rows = container!.querySelectorAll('.service-row')
        gsap.fromTo(
          rows,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power3.out',
            duration: 0.7,
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }, container!)
    }

    setup()
    return () => ctx?.revert()
  }, [])

  const active = services[activeIndex]

  return (
    <section style={{ padding: '6rem 5%', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <EyebrowText>The House Menu</EyebrowText>
          <div
            style={{
              fontFamily: "'Oi', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--text-primary)',
              marginTop: '0.75rem',
            }}
          >
            <AnimatedHeading as="h2" trigger={true}>
              What we pour.
            </AnimatedHeading>
          </div>
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left column — service list */}
          <div ref={listRef}>
            {services.map((service, i) => (
              <div
                key={service.num}
                className="service-row"
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(184,134,11,0.08)',
                  cursor: 'default',
                  position: 'relative',
                  opacity: 0,
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "'Big Shoulders Display', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: activeIndex === i ? 'var(--brass)' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                    minWidth: '2rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {service.num}
                </span>

                {/* Name + sliding brass underline */}
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.25rem',
                    color: activeIndex === i ? 'var(--text-primary)' : 'var(--text-muted)',
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
                      transform: activeIndex === i ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </span>
              </div>
            ))}
          </div>

          {/* Right column — active service detail card */}
          <div
            key={activeIndex}
            style={{
              padding: '2rem',
              background: 'var(--card-surface)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              animation: 'hmFadeIn 0.25s ease',
              position: 'sticky',
              top: '5rem',
            }}
          >
            <div style={{ marginBottom: '1.25rem', opacity: 0.6 }}>{active.icon}</div>

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
              {active.num} — Service
            </p>

            <h3
              style={{
                fontFamily: "'Oi', serif",
                fontSize: '1.75rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              {active.name}
            </h3>

            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
              }}
            >
              {active.desc}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hmFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
