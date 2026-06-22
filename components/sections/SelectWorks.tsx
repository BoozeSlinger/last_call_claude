'use client'

import { useEffect, useRef } from 'react'
import { CldImage } from 'next-cloudinary'
import EyebrowText from '@/components/ui/EyebrowText'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const projects = [
  {
    num: '01',
    client: 'Gra Pow Riverside',
    venue: 'Thai Fusion Sports Bar, Riverside CA',
    title: 'Zero to #1 on ChatGPT.',
    desc: 'AI strategy and digital presence built from scratch. They went from invisible to ranking #1 on ChatGPT for Thai food in their city. The phone doesn\'t stop.',
    tags: ['AI Strategy', 'Digital Presence', 'Local SEO'],
    color: '#2a1f15',
    image: 'grapow-logo',
  },
  {
    num: '02',
    client: 'Killer Queens',
    venue: 'Social House, Inland Empire CA',
    title: 'Dead nights don\'t exist anymore.',
    desc: 'Branding, design, and guest retention systems that flipped the script on slow nights. Wednesday used to be dead. Now they turn people away.',
    tags: ['Branding', 'Design', 'Guest Retention'],
    color: '#1f1a2a',
    image: 'Screenshot_2026-04-02_at_4.04.33_AM_opuqsk',
  },
  {
    num: '03',
    client: 'Happy Dad',
    venue: 'Beer Brand, Los Angeles CA',
    title: 'Built for the shelf and the scroll.',
    desc: 'Marketing strategy and content systems for a beer brand that lives in bars, not boardrooms. Distribution-first, culture-forward.',
    tags: ['Marketing', 'Content', 'Brand Strategy'],
    color: '#1a2018',
    image: 'HappyDadBrandLogo_zkfp7f',
  },
  {
    num: '04',
    client: 'Proabition',
    venue: 'Bar & Lounge, Inland Empire CA',
    title: '8,000 guests. Zero Yelp dependency.',
    desc: 'CRM build-out and guest capture system that handed ownership back to the bar. 8,000 customer contacts owned outright. Yelp no longer holds them hostage.',
    tags: ['CRM', 'Guest Capture', 'SMS & Email'],
    color: '#241a15',
    image: 'proabition-downtown-riverside',
  },
  {
    num: '05',
    client: 'Armen Z Legacy Foundation',
    venue: 'Event & Tournament, Southern CA',
    title: 'Sponsors felt like they backed the Masters.',
    desc: 'Tournament website and event digital strategy built to attract serious sponsors. Exceeded every expectation — and raised the room.',
    tags: ['Event Digital', 'Web Design', 'Sponsorship'],
    color: '#1a1a24',
    image: 'armenzsite',
  },
]

export default function SelectWorks() {
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null
    const tiltCleanups: (() => void)[] = []

    async function setup() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!trackRef.current || !stickyRef.current) return

      ctx = gsap.context(() => {
        // Pin the sticky viewport itself — GSAP injects a correctly-sized spacer
        // so downstream sections are pushed down by exactly the scroll distance needed.
        const scrollTween = gsap.to(trackRef.current, {
          x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: stickyRef.current,
            start: 'top top',
            end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`
              }
            },
          },
        })

        // Reveal content for each panel using containerAnimation
        const panels = trackRef.current!.querySelectorAll('.panel-content')
        panels.forEach((panel, i) => {
          const panelEl = trackRef.current!.querySelectorAll('.project-panel')[i]
          gsap.fromTo(
            panel,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panelEl,
                containerAnimation: scrollTween,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })

        // 3D tilt on image panels
        const projectPanels = Array.from(
          trackRef.current!.querySelectorAll<HTMLElement>('.project-panel')
        )
        projectPanels.forEach((panel) => {
          const imgSide = panel.querySelector<HTMLElement>('.image-side')
          if (!imgSide) return

          gsap.set(imgSide, { transformPerspective: 1200, force3D: true })

          const onMove = (e: MouseEvent) => {
            const rect = panel.getBoundingClientRect()
            const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2
            const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2
            imgSide.style.willChange = 'transform'
            gsap.to(imgSide, {
              rotationY: xPct * 8,
              rotationX: -yPct * 5,
              ease: 'power2.out',
              duration: 0.35,
              overwrite: 'auto',
            })
          }

          const onLeave = () => {
            gsap.to(imgSide, {
              rotationY: 0,
              rotationX: 0,
              ease: 'elastic.out(1, 0.4)',
              duration: 0.7,
              overwrite: 'auto',
              onComplete: () => { imgSide.style.willChange = 'auto' },
            })
          }

          panel.addEventListener('mousemove', onMove)
          panel.addEventListener('mouseleave', onLeave)
          tiltCleanups.push(() => {
            panel.removeEventListener('mousemove', onMove)
            panel.removeEventListener('mouseleave', onLeave)
          })
        })
      })
    }

    setup()
    return () => {
      ctx?.revert()
      tiltCleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <>
      {/* Section header — outside the sticky/pin area */}
      <div
        style={{
          padding: '6rem 5% 3rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <EyebrowText>Select Works</EyebrowText>
        <div
          style={{
            fontFamily: "'Oi', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: 'var(--text-primary)',
            marginTop: '0.75rem',
          }}
        >
          <AnimatedHeading as="h2" trigger={true}>
            Five bars. Five stories.
          </AnimatedHeading>
        </div>
      </div>

      {/* GSAP pins this element and injects a spacer equal to the scroll distance */}
      <div
        ref={stickyRef}
        style={{
          height: '100vh',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
          {/* Horizontal track */}
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              width: `${projects.length * 100}vw`,
              height: '100%',
            }}
          >
            {projects.map((project, i) => (
              <div
                key={project.num}
                className="project-panel"
                style={{
                  width: '100vw',
                  height: '100vh',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'hidden',
                }}
              >
                {/* Image side (55%) */}
                <div
                  className="image-side"
                  style={{
                    width: '55%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${project.color} 0%, #1a1612 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <CldImage
                    src={project.image}
                    fill
                    alt={project.client}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="55vw"
                  />
                  {/* Brass grid overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'linear-gradient(rgba(184,134,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,134,11,0.03) 1px, transparent 1px)',
                      backgroundSize: '60px 60px',
                    }}
                  />
                </div>

                {/* Content side (45%) */}
                <div
                  style={{
                    width: '45%',
                    height: '100%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 5% 0 5%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Watermark number — 50-60% card height, bleeds off right edge */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '8%',
                      right: '-0.1em',
                      fontFamily: "'Oi', serif",
                      fontSize: 'clamp(12rem, 28vw, 36rem)',
                      color: 'rgba(184,134,11,0.055)',
                      lineHeight: 1,
                      userSelect: 'none',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {project.num}
                  </span>

                  {/* Main content */}
                  <div className="panel-content" style={{ opacity: 0, position: 'relative', zIndex: 1 }}>
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
                      {project.client}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {project.venue}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Oi', serif",
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.1,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.92rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.8,
                        maxWidth: '380px',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "'Big Shoulders Display', sans-serif",
                            fontSize: '0.65rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--brass-light)',
                            background: 'rgba(184,134,11,0.1)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '100px',
                            padding: '4px 12px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.9rem',
                        color: 'var(--brass)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        position: 'relative',
                        paddingBottom: '2px',
                      }}
                      className="view-project-link"
                    >
                      View Project
                      <span style={{ fontSize: '1rem' }}>→</span>
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '1px',
                          background: 'var(--brass)',
                          transform: 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 0.3s ease',
                        }}
                        className="link-underline"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '2px',
              background: 'rgba(184,134,11,0.1)',
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                height: '100%',
                background: 'var(--brass)',
                width: '0%',
                transition: 'none',
              }}
            />
            {/* Tick marks */}
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 0',
              }}
            >
              {projects.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '2px',
                    height: '10px',
                    background: 'rgba(184,134,11,0.3)',
                    position: 'absolute',
                    left: `${(i / (projects.length - 1)) * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              ))}
            </div>
          </div>
      </div>

      <style>{`
        .view-project-link:hover .link-underline {
          transform: scaleX(1);
        }
      `}</style>
    </>
  )
}
