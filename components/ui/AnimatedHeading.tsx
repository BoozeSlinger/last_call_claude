'use client'

import { useEffect, useRef } from 'react'

interface AnimatedHeadingProps {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  trigger?: boolean
  className?: string
}

export default function AnimatedHeading({
  children,
  as: Tag = 'h1',
  trigger = false,
  className = '',
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null)

  const words = children.split(' ')

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ctx: { revert: () => void } | null = null

    async function setupAnimation() {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.default

      if (trigger) {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)
      }

      ctx = gsap.context(() => {
        const letters = el!.querySelectorAll('.letter')
        gsap.fromTo(
          letters,
          { opacity: 0, y: 50, rotation: 6, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            ease: 'back.out(1.7)',
            stagger: 0.03,
            ...(trigger
              ? {
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                  },
                }
              : { delay: 0.1 }),
          }
        )
      }, el!)
    }

    setupAnimation()

    return () => {
      ctx?.revert()
    }
  }, [trigger])

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => (
            <span key={ci} className="letter" style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  )
}
