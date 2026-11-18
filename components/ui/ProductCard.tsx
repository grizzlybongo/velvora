'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/money'
import { fadeUp } from '@/lib/utils'
import type { StorefrontProduct, StorefrontVariant } from '@/lib/db/types'

interface ProductCardProps {
  product: StorefrontProduct
  index?: number
  priority?: boolean
}

function getPriceSummary(product: StorefrontProduct): {
  hasMultiplePrices: boolean
  displayPrice: string
  compareAtPrice: string | null
} {
  if (product.variants.length === 0) {
    return {
      hasMultiplePrices: false,
      displayPrice: formatPrice(product.price),
      compareAtPrice: null,
    }
  }

  let lowestVariant: StorefrontVariant = product.variants[0]
  const distinctPrices = new Set<number>()

  for (const variant of product.variants) {
    const numericPrice = Number(variant.price)
    distinctPrices.add(numericPrice)
    if (numericPrice < Number(lowestVariant.price)) {
      lowestVariant = variant
    }
  }

  return {
    hasMultiplePrices: distinctPrices.size > 1,
    displayPrice: formatPrice(lowestVariant.price),
    compareAtPrice: lowestVariant.compareAt
      ? formatPrice(lowestVariant.compareAt)
      : null,
  }
}

export default function ProductCard({
  product,
  index = 0,
  priority = false,
}: ProductCardProps) {
  const heroImage = product.images[0]
  const imageAlt =
    heroImage?.alt && heroImage.alt.trim().length > 0
      ? heroImage.alt
      : `${product.name}, ${product.family ?? 'eau de parfum'}`

  const { hasMultiplePrices, displayPrice, compareAtPrice } =
    getPriceSummary(product)

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      custom={index}
      data-cursor="expand"
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        {/* Fixed aspect-ratio image container (CLS-safe) */}
        <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden bg-[#f4f2ee]">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105 group-focus-visible:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
              <span
                className="font-body text-[10px] font-light uppercase"
                style={{
                  letterSpacing: '0.2em',
                  color: '#8a8a82',
                  opacity: 0.5,
                }}
              >
                {product.name}
              </span>
            </div>
          )}

          {/* Sold out badge */}
          {!product.inStock && (
            <span className="absolute top-3 left-3 z-10 border border-rule bg-canvas/95 px-3 py-1 font-body text-[10px] font-light tracking-label text-ink uppercase">
              Sold out
            </span>
          )}

          {/* Hover & keyboard focus overlay */}
          <div className="absolute inset-0 bg-green-dark/0 transition-colors duration-500 group-hover:bg-green-dark/10 group-focus-visible:bg-green-dark/10" />

          {/* Quick view label */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center pb-6 transition-transform duration-500 ease-luxury group-hover:translate-y-0 group-focus-visible:translate-y-0">
            <span className="bg-ink px-6 py-2.5 font-body text-[11px] font-light tracking-label text-surface uppercase">
              Quick View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          {product.family && (
            <p className="font-body text-[10px] font-light tracking-label text-muted uppercase">
              {product.family}
            </p>
          )}

          <h3 className="font-display text-xl font-light tracking-wide text-ink">
            {product.name}
          </h3>

          <p className="font-body text-sm font-extralight text-muted line-clamp-1">
            {product.tagline ?? product.description}
          </p>

          <p className="pt-1 font-body text-xs font-light tracking-wide text-ink">
            <span>
              {hasMultiplePrices ? `From ${displayPrice}` : displayPrice}
            </span>
            {compareAtPrice && (
              <s
                aria-label="Original price"
                className="ml-2 font-extralight text-muted/70"
              >
                {compareAtPrice}
              </s>
            )}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
