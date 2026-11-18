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
import { getProducts, getHomepageCollections } from '@/lib/db'

// Homepage fetches products/collections from DB at request time
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch data at the page level (server component) in a single parallel round-trip
  const [featured, homepageCollections] = await Promise.all([
    getProducts({ featured: true, limit: 6 }),
    getHomepageCollections(),
  ])

  const collectionRows = homepageCollections.filter(
    (col) => col.products.length > 0
  )

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <CollectionGrid products={featured} />
        <GoldRule />
        <Philosophy />
        <GoldRule />
        <WhyVelvora />
        <GoldRule />
        <Products collections={collectionRows} />
        <GoldRule />
        <Journal />
      </main>
      <Footer />
    </>
  )
}
