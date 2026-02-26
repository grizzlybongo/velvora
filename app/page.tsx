import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import CollectionGrid from '@/components/home/CollectionGrid'
import Philosophy from '@/components/home/Philosophy'
import WhyVelvora from '@/components/home/WhyVelvora'
import Products from '@/components/home/Products'
import Journal from '@/components/home/Journal'
import Footer from '@/components/layout/Footer'
import GoldRule from '@/components/ui/GoldRule'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <CollectionGrid />
        <GoldRule />
        <Philosophy />
        <GoldRule />
        <WhyVelvora />
        <GoldRule />
        <Products />
        <GoldRule />
        <Journal />
      </main>
      <Footer />
    </>
  )
}
