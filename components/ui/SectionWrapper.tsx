'use client'

import { useEffect, useRef } from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  noReveal?: boolean
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  noReveal = false,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (noReveal) return
    const el = sectionRef.current
    if (!el) return

    let ctx: { revert: () => void } | null = null

    async function setup() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const children = el!.querySelectorAll('[data-reveal]')
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      }, el)
    }

    setup()

    return () => {
      ctx?.revert()
    }
  }, [noReveal])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative px-[5%] py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  )
}
