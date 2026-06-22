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
  const elRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    let ctx: { revert: () => void } | null = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let split: any = null

    async function setup() {
      // Fonts must be loaded before SplitText measures character widths
      await document.fonts.ready

      const gsap = (await import('gsap')).default
      const { SplitText } = await import('gsap/SplitText')

      if (trigger) {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(SplitText, ScrollTrigger)
      } else {
        gsap.registerPlugin(SplitText)
      }

      ctx = gsap.context(() => {
        // Masked word slide-up — each word clips from below its own overflow container
        split = SplitText.create(el!, { type: 'words', mask: 'words' })
        gsap.set(split.words, { y: '110%' })
        gsap.set(el!, { visibility: 'visible' })

        gsap.to(split.words, {
          y: '0%',
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.07,
          force3D: true,
          ...(trigger
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 82%',
                  toggleActions: 'play none none reverse',
                  invalidateOnRefresh: true,
                },
              }
            : { delay: 0.15 }),
        })
      }, el!)
    }

    setup()

    return () => {
      split?.revert()
      ctx?.revert()
    }
  }, [trigger])

  return (
    <Tag
      ref={elRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ visibility: 'hidden' }}
    >
      {children}
    </Tag>
  )
}
