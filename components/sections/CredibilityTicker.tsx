'use client'

const ITEMS = [
  'BEHIND THE STICK',
  '25+ YEARS',
  'IE + EAST LA',
  'ZERO TEMPLATES',
  'BAR-BUILT AI',
  'OWNED GUEST LISTS',
  'NO YELP DEPENDENCY',
  'HIGH PROOF DESIGN',
]

const Diamond = () => (
  <svg
    aria-hidden="true"
    width="5"
    height="5"
    viewBox="0 0 5 5"
    fill="none"
    style={{ flexShrink: 0, margin: '0 1.25rem' }}
  >
    <rect
      x="2.5"
      y="0"
      width="3.5"
      height="3.5"
      transform="rotate(45 2.5 2.5)"
      fill="var(--brass-dim)"
    />
  </svg>
)

export default function CredibilityTicker() {
  // doubled = seamless loop: when we translateX(-50%) we're at the clone start
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(184,134,11,0.15)',
        borderBottom: '1px solid rgba(184,134,11,0.15)',
        padding: '0.8rem 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'lcc-ticker 32s linear infinite',
          willChange: 'transform',
        }}
      >
        {doubled.map((text, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
          >
            <span
              style={{
                fontFamily: "'Big Shoulders Display', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--brass-light)',
              }}
            >
              {text}
            </span>
            <Diamond />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes lcc-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
