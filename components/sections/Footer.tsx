'use client'

import Button from '@/components/ui/Button'

export default function Footer() {
  const navLinks = {
    services: ['Custom Websites', 'Brand Identity', 'AI Tools', 'Marketing', 'Retainers'],
    work: ['Gra Pow', 'Gametime', 'Case Studies', 'Portfolio'],
    social: [
      { name: 'Instagram', href: '#' },
      { name: 'Twitter / X', href: '#' },
      { name: 'LinkedIn', href: '#' },
    ],
  }

  return (
    <footer
      id="contact"
      style={{
        padding: '60px 5%',
        borderTop: '1px solid rgba(184,134,11,0.15)',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '4rem',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        {/* Logotype */}
        <div>
          <p
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            Last Call Collective
          </p>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginTop: '4px',
              letterSpacing: '0.02em',
            }}
          >
            lastcall.marketing
          </p>
        </div>

        {/* CTA */}
        <a href="mailto:ryanhustliesie@gmail.com" style={{ textDecoration: 'none' }}>
          <Button variant="brass" size="md">
            Start a project
          </Button>
        </a>
      </div>

      {/* Middle row — 3 columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem',
          marginBottom: '4rem',
        }}
      >
        {/* Col 1: Services */}
        <div>
          <p
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--brass-light)',
              marginBottom: '1.25rem',
            }}
          >
            Services
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {navLinks.services.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--brass-light)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Work */}
        <div>
          <p
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--brass-light)',
              marginBottom: '1.25rem',
            }}
          >
            Work
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {navLinks.work.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--brass-light)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Find us */}
        <div>
          <p
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--brass-light)',
              marginBottom: '1.25rem',
            }}
          >
            Find us
          </p>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
              marginBottom: '1.5rem',
            }}
          >
            {navLinks.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--brass-light)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-muted)')}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              opacity: 0.6,
            }}
          >
            Riverside, CA
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(184,134,11,0.08)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            opacity: 0.6,
          }}
        >
          © Last Call Collective 2026
        </p>

        {/* Brass rule */}
        <div
          aria-hidden="true"
          style={{ width: '40px', height: '1px', background: 'var(--brass-dim)', opacity: 0.5 }}
        />

        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            opacity: 0.6,
          }}
        >
          Built by the ones who close.
        </p>
      </div>
    </footer>
  )
}
