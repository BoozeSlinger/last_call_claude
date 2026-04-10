'use client'

import { useRef, createContext, useContext, useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type NavigateFn = (href: string) => void

const CurtainContext = createContext<NavigateFn>(() => {})

export function useCurtainNav() {
  return useContext(CurtainContext)
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Slide out on route change (page loaded)
  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return
    // Slide out
    curtain.style.transition = 'transform 0.3s ease-out'
    curtain.style.transform = 'translateX(100%)'
    const t = setTimeout(() => {
      curtain.style.transform = 'translateX(-100%)'
      curtain.style.transition = 'none'
    }, 350)
    return () => clearTimeout(t)
  }, [pathname])

  const navigate: NavigateFn = useCallback((href: string) => {
    if (isTransitioning) return
    const curtain = curtainRef.current
    if (!curtain) {
      router.push(href)
      return
    }
    setIsTransitioning(true)
    curtain.style.transition = 'transform 0.35s ease-in'
    curtain.style.transform = 'translateX(0)'
    setTimeout(() => {
      router.push(href)
      setIsTransitioning(false)
    }, 400)
  }, [isTransitioning, router])

  return (
    <CurtainContext.Provider value={navigate}>
      {children}
      <div
        ref={curtainRef}
        className="page-curtain"
        aria-hidden="true"
      />
    </CurtainContext.Provider>
  )
}
