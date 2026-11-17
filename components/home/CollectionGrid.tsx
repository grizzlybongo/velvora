import CollectionGridClient from './CollectionGridClient'
import type { StorefrontProduct } from '@/lib/db/types'

export default function CollectionGrid({
  products,
}: {
  products: StorefrontProduct[]
}) {
  return <CollectionGridClient products={products} />
}
