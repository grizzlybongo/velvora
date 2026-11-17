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
import { getProducts, getCollections, getCollectionBySlug } from '@/lib/db'
import type { CollectionRow } from '@/components/home/Products'

// Homepage fetches products/collections from DB at request time
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch data at the page level (server component) so child components
  // stay synchronous — avoids the Turbopack Performance.measure() bug
  // with async React component exports.
  const [featured, collections] = await Promise.all([
    getProducts({ featured: true }),
    getCollections(),
  ])

  // Build collection rows with their products
  const collectionRows: CollectionRow[] = []
  for (const col of collections) {
    const full = await getCollectionBySlug(col.slug)
    if (full && full.products.length > 0) {
      collectionRows.push({
        id: full.id,
        name: full.name,
        slug: full.slug,
        products: full.products,
      })
    }
  }

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
