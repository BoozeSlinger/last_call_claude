'use client'

import { useEffect } from 'react'

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function registerPlugins() {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const { MotionPathPlugin } = await import('gsap/MotionPathPlugin')
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
    }
    registerPlugins()
  }, [])

  return <>{children}</>
}
