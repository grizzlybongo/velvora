'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/money'
import { fadeUp } from '@/lib/utils'
import type { StorefrontVariant } from '@/lib/db/types'
import type { CollectionRow } from './Products'

/* ─────────────────────────────────────────────
   Carousel Product Card
   ───────────────────────────────────────────── */

type RowProduct = CollectionRow['products'][number]

function getCarouselPriceSummary(product: RowProduct): {
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

function CarouselProductCard({ product }: { product: RowProduct }) {
  const heroImage = product.images[0]
  const imageAlt =
    heroImage?.alt && heroImage.alt.trim().length > 0
      ? heroImage.alt
      : `${product.name}, ${product.family ?? 'eau de parfum'}`

  const { hasMultiplePrices, displayPrice, compareAtPrice } =
    getCarouselPriceSummary(product)

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={product.name}
      onFocus={(e) => {
        e.currentTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        })
      }}
      className="product-card group block shrink-0 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
      data-cursor="expand"
    >
      {/* Fixed 3:4 aspect-ratio block (CLS-safe) */}
      <div className="product-card-block relative aspect-[3/4] w-full overflow-hidden bg-[#f4f2ee]">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 75vw, 25vw"
            className="object-cover transition-[filter,transform] duration-500 ease-out group-hover:scale-105 group-hover:brightness-[1.06] group-focus-visible:scale-105 group-focus-visible:brightness-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span
              className="font-body text-[10px] font-light uppercase"
              style={{
                letterSpacing: '0.2em',
                color: '#8a8a82',
                opacity: 0.7,
              }}
            >
              {product.name}
            </span>
          </div>
        )}

        {!product.inStock && (
          <span className="absolute top-3 left-3 z-10 border border-rule bg-canvas/95 px-3 py-1 font-body text-[10px] font-light tracking-label text-ink uppercase">
            Sold out
          </span>
        )}
      </div>

      {/* Card info */}
      <div className="mt-5 space-y-1.5">
        {product.family && (
          <p className="font-body text-[10px] font-light tracking-label text-muted uppercase">
            {product.family}
          </p>
        )}

        <h3 className="font-display text-[22px] leading-[1.25] font-normal text-[#1a1a18] transition-colors duration-300 group-hover:text-[#0e0e0c] group-focus-visible:text-[#0e0e0c]">
          {product.name}
        </h3>

        <p className="font-body text-[14px] leading-[1.5] font-light italic text-[#8a8a82] line-clamp-2">
          {product.tagline ?? product.description}
        </p>

        <p className="pt-0.5 font-body text-xs font-light tracking-wide text-ink">
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

        <span className="mt-1.5 block h-px w-0 bg-[#8a8a82]/40 transition-all duration-250 ease-out group-hover:w-full group-focus-visible:w-full" />
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────
   Collection Row — independent horizontal scroll
   ───────────────────────────────────────────── */

function CollectionRowSection({
  collection,
  index,
}: {
  collection: CollectionRow
  index: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollBounds = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    updateScrollBounds()
    window.addEventListener('resize', updateScrollBounds)
    return () => window.removeEventListener('resize', updateScrollBounds)
  }, [updateScrollBounds, collection.products.length])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const firstCard = el.querySelector<HTMLElement>('.product-card')
    const cardWidth = (firstCard?.offsetWidth ?? 340) + 24
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={index}
    >
      {/* Subtle chapter-break rule between rows (not on first) */}
      {index > 0 && (
        <div className="mx-5 mb-12 border-t border-black/5 sm:mx-8 md:mb-20 lg:mx-20" />
      )}

      {/* Row header */}
      <div className="px-5 sm:px-8 lg:px-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2.5 font-body text-[10px] font-light tracking-label text-[#b8a98a] uppercase">
              Collection
            </p>
            <h3 className="font-display text-2xl font-light tracking-wide text-ink sm:text-[28px]">
              {collection.name}
            </h3>
          </div>

          {/* Prev/Next controls — min 44×44px hit area, disabled at ends */}
          <div className="flex shrink-0 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center border border-rule text-ink transition-colors hover:border-ink focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-30"
              data-cursor="expand"
              aria-label={`Scroll ${collection.name} left`}
            >
              <span className="font-body text-sm" aria-hidden="true">
                ←
              </span>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-11 w-11 min-h-11 min-w-11 items-center justify-center border border-rule text-ink transition-colors hover:border-ink focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-30"
              data-cursor="expand"
              aria-label={`Scroll ${collection.name} right`}
            >
              <span className="font-body text-sm" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        onScroll={updateScrollBounds}
        data-lenis-prevent
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-5 scroll-smooth sm:scroll-px-8 sm:px-8 lg:scroll-px-20 lg:px-20"
      >
        {collection.products.map((product) => (
          <CarouselProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Empty state
   ───────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="px-5 py-24 text-center sm:px-8 lg:px-20">
      <p className="font-display text-2xl font-light italic tracking-wide text-muted">
        New compositions arriving soon.
      </p>
      <p className="mt-3 font-body text-[13px] font-light text-muted">
        Our artisans are at work — check back shortly.
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Products Section — THE COLLECTION
   ───────────────────────────────────────────── */

export default function ProductsClient({
  collections,
}: {
  collections: CollectionRow[]
}) {
  return (
    <section
      id="products"
      className="scroll-mt-20 bg-surface pt-20 pb-28 md:pt-28 md:pb-36 lg:pt-[120px] lg:pb-[160px]"
    >
      {/* Section header */}
      <div className="px-5 sm:px-8 lg:px-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="mb-4 font-body text-[10px] font-light tracking-label text-[#b8a98a] uppercase">
            The Collection
          </p>
          <h2 className="font-display text-4xl font-light tracking-wide text-ink md:text-5xl">
            Products
          </h2>
        </motion.div>
      </div>

      {/* Stacked collection rows or empty state */}
      {collections.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-12 flex flex-col gap-16 md:mt-[72px] md:gap-[120px]">
          {collections.map((col, i) => (
            <CollectionRowSection
              key={col.id}
              collection={col}
              index={i}
            />
          ))}
        </div>
      )}
    </section>
  )
}
