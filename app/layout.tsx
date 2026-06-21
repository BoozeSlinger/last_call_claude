import type { Metadata } from 'next'
import { Oi, Space_Grotesk } from 'next/font/google'
import './globals.css'
import GSAPProvider from '@/components/GSAPProvider'
import PageTransition from '@/components/PageTransition'
import AmbientDustCanvas from '@/components/AmbientDustCanvas'
import NoiseOverlay from '@/components/NoiseOverlay'
import MagneticCursor from '@/components/ui/MagneticCursor'

const oi = Oi({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-oi',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Last Call Collective — Digital Agency for Bars & Hospitality',
  description:
    'We build the digital presence your bar deserves. Custom websites, brand identity, AI-powered tools, and digital marketing for bars and restaurants across the IE and East LA.',
  keywords: [
    'bar marketing',
    'restaurant website',
    'hospitality digital agency',
    'IE bar',
    'East LA bar',
    'Last Call Collective',
  ],
  openGraph: {
    title: 'Last Call Collective',
    description: 'Digital agency built for bars. Custom websites. No templates.',
    url: 'https://lastcall.marketing',
    siteName: 'Last Call Collective',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Last Call Collective',
    description: 'Digital agency built for bars.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oi.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundColor: '#111009',
          color: '#e8e0d4',
          fontFamily: 'var(--font-space-grotesk), sans-serif',
        }}
      >
        {/* Custom brass cursor */}
        <MagneticCursor />

        {/* Fixed background canvas */}
        <AmbientDustCanvas />

        {/* Animated noise overlay stack */}
        <NoiseOverlay />

        {/* CSS atmosphere layers */}
        <div className="atmosphere-left" aria-hidden="true" />
        <div className="atmosphere-right" aria-hidden="true" />

        {/* Providers */}
        <GSAPProvider>
          <PageTransition>
            <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
          </PageTransition>
        </GSAPProvider>
      </body>
    </html>
  )
}
