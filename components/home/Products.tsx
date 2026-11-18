import ProductsClient from './ProductsClient'
import type { StorefrontProduct } from '@/lib/db/types'

export type CollectionRow = {
  id: string
  name: string
  slug: string
  products: StorefrontProduct[]
}

export default function Products({
  collections,
}: {
  collections: CollectionRow[]
}) {
  return <ProductsClient collections={collections} />
}
