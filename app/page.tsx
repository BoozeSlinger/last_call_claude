import Hero from '@/components/sections/Hero'
import CredibilityTicker from '@/components/sections/CredibilityTicker'
import HouseMenu from '@/components/sections/HouseMenu'
import SelectWorks from '@/components/sections/SelectWorks'
import Testimonials from '@/components/sections/Testimonials'
import InTheWeeds from '@/components/sections/InTheWeeds'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityTicker />
      <HouseMenu />
      <SelectWorks />
      <Testimonials />
      <InTheWeeds />
      <Footer />
    </>
  )
}
