'use client'

import { useEffect, useRef } from 'react'
import EyebrowText from '@/components/ui/EyebrowText'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const paragraphs = [
  "Between us, we have 25+ years behind the stick, behind distributor routes, and inside this industry. Happy Dad. Beer Slingers. Brewery X. Craft LA. We've watched great bars fold because nobody could find them online. Watched operators bleed regulars to spots that just showed up higher on Google. Watched a single Yelp review take out a month's momentum. We build from that experience — not from a desk.",
  "Instagram is borrowed land. Yelp is borrowed land. AI assistants, Google, and Apple Maps are where your next customer actually starts — and if your bar isn't showing up there, they're going somewhere else. We build the infrastructure you actually own: your website, your guest list, your AI visibility. No chasing algorithms. No praying the platform doesn't bury you. Just a real digital foundation that works whether you're behind the bar or asleep.",
  "IE and East LA is home. That\u2019s the territory we know, the operators we serve, and the bars we drink in.",
]

const stats = [
  { value: '25+', label: 'Combined years in the industry' },
  { value: 'IE + East LA', label: 'Territory covered' },
  { value: '$0', label: 'Templates used' },
  { value: '5', label: 'Active client builds' },
]

const polaroidColors = ['#2a201a', '#1a2020', '#20201a']
const polaroidRotations = [-3, 1, -1.5]

export default function InTheWeeds() {
  const parasRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    async function setup() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Paragraphs stagger reveal — each individually triggered
        if (parasRef.current) {
          const paras = parasRef.current.querySelectorAll('p')
          paras.forEach((para) => {
            gsap.fromTo(
              para,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: para,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          })
        }

        // Polaroid cards animate in from y:80, rotation:0 → final rotated positions
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.polaroid-card')
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { y: 80, rotation: 0, opacity: 0 },
              {
                y: 0,
                rotation: polaroidRotations[i],
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                delay: i * 0.15,
                scrollTrigger: {
                  trigger: cardsRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              }
            )
          })
        }

        // Stats row stagger reveal
        if (statsRef.current) {
          const statEls = statsRef.current.querySelectorAll('.stat-item')
          gsap.fromTo(
            statEls,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }

    setup()
    return () => ctx?.revert()
  }, [])

  return (
    <section style={{ padding: '6rem 5%', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <EyebrowText>In the Weeds</EyebrowText>
          <div
            style={{
              fontFamily: "'Oi', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--text-primary)',
              marginTop: '0.75rem',
            }}
          >
            <AnimatedHeading as="h2" trigger={true}>
              Built from the floor up.
            </AnimatedHeading>
          </div>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '60% 40%',
            gap: '4rem',
            alignItems: 'start',
            marginBottom: '5rem',
          }}
        >
          {/* Left: paragraphs */}
          <div ref={parasRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: i === 2 ? '1.15rem' : '1.1rem',
                  color: i === 2 ? 'var(--brass-light)' : 'var(--text-muted)',
                  lineHeight: 1.9,
                  opacity: 0,
                  fontStyle: i === 2 ? 'italic' : 'normal',
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Right: polaroid stack */}
          <div
            ref={cardsRef}
            style={{
              position: 'relative',
              height: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {polaroidColors.map((color, i) => (
              <div
                key={i}
                className="polaroid-card"
                style={{
                  position: 'absolute',
                  width: '240px',
                  height: '280px',
                  background: color,
                  border: '6px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  borderRadius: '4px',
                  opacity: 0,
                  overflow: 'hidden',
                  top: `${i * 8}px`,
                  left: `${i * 10}px`,
                  zIndex: polaroidColors.length - i,
                }}
              >
                {/* Placeholder bar imagery */}
                <div
                  style={{
                    width: '100%',
                    height: '80%',
                    background: `linear-gradient(160deg, ${color} 0%, #1a1612 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.3">
                    <rect x="4" y="20" width="40" height="20" rx="2" stroke="var(--brass-dim)" strokeWidth="1.5" />
                    <path d="M12 20V12a2 2 0 012-2h20a2 2 0 012 2v8" stroke="var(--brass-dim)" strokeWidth="1.5" />
                    <circle cx="24" cy="10" r="3" stroke="var(--brass-dim)" strokeWidth="1.5" />
                  </svg>
                </div>
                {/* Polaroid caption area */}
                <div
                  style={{
                    height: '20%',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      opacity: 0.5,
                    }}
                  >
                    Bar &amp; Venue Photography
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(184,134,11,0.15)',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item" style={{ textAlign: 'center', opacity: 0 }}>
              <p
                style={{
                  fontFamily: "'Oi', serif",
                  fontSize: '3rem',
                  color: 'var(--brass-light)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
