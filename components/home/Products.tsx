import ProductsClient from './ProductsClient'

export type CollectionRow = {
  id: string
  name: string
  slug: string
  products: {
    id: string
    name: string
    slug: string
    description: string | null
    price: string
    compareAt: string | null
    currency: string
    featured: boolean
    images: { url: string; alt: string }[]
    variants: { id: string; sku: string; name: string; price: string; inventory: number }[]
    createdAt: string
  }[]
}

export default function Products({
  collections,
}: {
  collections: CollectionRow[]
}) {
  return <ProductsClient collections={collections} />
}
