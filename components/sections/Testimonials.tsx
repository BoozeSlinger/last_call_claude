'use client'

import EyebrowText from '@/components/ui/EyebrowText'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const testimonials = [
  {
    quote: "We went from zero online presence to ranking #1 on ChatGPT for Thai food in our city. The phone doesn't stop.",
    name: 'Isaac Sura',
    venue: 'Gra Pow Riverside',
    initials: 'IS',
  },
  {
    quote: "Wednesday nights used to be dead. Now we turn people away. That's the only stat that matters.",
    name: 'Michael Lopez',
    venue: 'Killer Queens Social House',
    initials: 'ML',
  },
  {
    quote: "I own 8,000 customer contacts now. Yelp doesn't hold me hostage anymore. That is power.",
    name: 'Derek Matos',
    venue: 'Proabition Bar',
    initials: 'DM',
  },
  {
    quote: "They built a tournament site that made our sponsors feel like they were backing the Masters. Exceeded every expectation.",
    name: 'Kiko Zennedjian',
    venue: 'Armen Z Legacy Foundation',
    initials: 'KZ',
  },
  {
    quote: "We went from zero online presence to ranking #1 on ChatGPT for Thai food in our city. The phone doesn't stop.",
    name: 'Isaac Sura',
    venue: 'Gra Pow Riverside',
    initials: 'IS',
  },
  {
    quote: "Wednesday nights used to be dead. Now we turn people away. That's the only stat that matters.",
    name: 'Michael Lopez',
    venue: 'Killer Queens Social House',
    initials: 'ML',
  },
  {
    quote: "I own 8,000 customer contacts now. Yelp doesn't hold me hostage anymore. That is power.",
    name: 'Derek Matos',
    venue: 'Proabition Bar',
    initials: 'DM',
  },
  {
    quote: "They built a tournament site that made our sponsors feel like they were backing the Masters. Exceeded every expectation.",
    name: 'Kiko Zennedjian',
    venue: 'Armen Z Legacy Foundation',
    initials: 'KZ',
  },
]

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      style={{
        width: '360px',
        flexShrink: 0,
        background: 'var(--card-surface)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '28px 24px',
        backdropFilter: 'blur(8px)',
        marginRight: '1.5rem',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--brass-dim), var(--brass))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.05em',
          }}
        >
          {t.initials}
        </span>
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.92rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          marginBottom: '1.25rem',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Name */}
      <p
        style={{
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--brass-light)',
          marginBottom: '2px',
        }}
      >
        {t.name}
      </p>

      {/* Venue */}
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          opacity: 0.7,
        }}
      >
        {t.venue}
      </p>
    </div>
  )
}

const row1 = testimonials.slice(0, 4)
const row2 = testimonials.slice(4, 8)

export default function Testimonials() {
  return (
    <section style={{ padding: '6rem 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '0 5%', marginBottom: '3rem' }}>
        <EyebrowText>Last Round</EyebrowText>
        <div
          style={{
            fontFamily: "'Oi', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: 'var(--text-primary)',
            marginTop: '0.75rem',
          }}
        >
          <AnimatedHeading as="h2" trigger={true}>
            What the regulars say.
          </AnimatedHeading>
        </div>
      </div>

      {/* Top brass rule */}
      <div style={{ height: '1px', background: 'rgba(184,134,11,0.2)', marginBottom: '2.5rem' }} />

      {/* Row 1 — scrolls left */}
      <div
        className="marquee-row"
        style={{
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div
          className="marquee-track-left"
          style={{ display: 'flex', width: 'max-content' }}
        >
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="marquee-row"
        style={{
          overflow: 'hidden',
          marginBottom: '2.5rem',
        }}
      >
        <div
          className="marquee-track-right"
          style={{ display: 'flex', width: 'max-content' }}
        >
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Bottom brass rule */}
      <div style={{ height: '1px', background: 'rgba(184,134,11,0.2)' }} />
    </section>
  )
}
