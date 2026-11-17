'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { fadeUp } from '@/lib/utils'
import type { CollectionRow } from './Products'

/* ─────────────────────────────────────────────
   Product Card — discovery surface, no price
   Larger, taller cards that command attention
   ───────────────────────────────────────────── */

type RowProduct = CollectionRow['products'][number]

function ProductCard({ product }: { product: RowProduct }) {
  const heroImage = product.images[0]

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block shrink-0 snap-start"
      data-cursor="expand"
    >
      {/* Color block / Image — tall 3:4.5 proportion */}
      <div className="product-card-block relative overflow-hidden bg-[#f4f2ee]">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || product.name}
            fill
            sizes="420px"
            className="object-cover transition-[filter] duration-300 ease-out group-hover:brightness-[1.06]"
          />
        ) : (
          /* Placeholder state — name centered on color block */
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

        {/* Hover brightness overlay */}
        <div className="pointer-events-none absolute inset-0 transition-[filter] duration-300 group-hover:brightness-[1.06]" />
      </div>

      {/* Card info — below, open layout with generous spacing */}
      <div style={{ marginTop: 20 }}>
        {/* Product name */}
        <h3
          className="font-display font-normal transition-colors duration-300"
          style={{ fontSize: 22, lineHeight: 1.25, color: '#1a1a18', marginBottom: 6 }}
        >
          <span className="group-hover:text-[#0e0e0c]">{product.name}</span>
        </h3>

        {/* One-line descriptor */}
        <p
          className="font-body font-light italic line-clamp-2"
          style={{ fontSize: 14, lineHeight: 1.5, color: '#8a8a82' }}
        >
          {product.description}
          {/* Underline animation */}
          <span className="mt-1.5 block h-px w-0 bg-[#8a8a82]/40 transition-all duration-250 ease-out group-hover:w-full" />
        </p>
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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = 400 + 24
    scrollRef.current.scrollBy({
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
        <div
          style={{
            borderTop: '1px solid rgba(0,0,0,0.05)',
            marginBottom: 80,
            marginLeft: 80,
            marginRight: 80,
          }}
        />
      )}

      {/* Row header */}
      <div style={{ paddingLeft: 80, paddingRight: 80 }}>
        <div className="flex items-end justify-between" style={{ marginBottom: 32 }}>
          <div>
            <p
              className="font-body font-light uppercase"
              style={{
                fontSize: '10px',
                letterSpacing: '0.25em',
                color: '#b8a98a',
                marginBottom: 10,
              }}
            >
              Collection
            </p>
            <h3
              className="font-display font-light tracking-wide text-ink"
              style={{ fontSize: 28 }}
            >
              {collection.name}
            </h3>
          </div>

          {/* Arrows */}
          <div className="hidden gap-3 md:flex" style={{ marginBottom: 2 }}>
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center border border-rule transition-colors hover:border-ink"
              data-cursor="expand"
              aria-label={`Scroll ${collection.name} left`}
            >
              <span className="font-body text-sm text-ink">←</span>
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center border border-rule transition-colors hover:border-ink"
              data-cursor="expand"
              aria-label={`Scroll ${collection.name} right`}
            >
              <span className="font-body text-sm text-ink">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex overflow-x-auto scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          gap: 24,
          paddingLeft: 80,
          paddingRight: 80,
          paddingBottom: 20,
        }}
      >
        {collection.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className="shrink-0" style={{ width: 40 }} />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Empty state
   ───────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="py-24 text-center" style={{ paddingLeft: 80, paddingRight: 80 }}>
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
      className="bg-surface"
      style={{ scrollMarginTop: '80px', paddingTop: 120, paddingBottom: 160 }}
    >
      {/* Section header */}
      <div style={{ paddingLeft: 80, paddingRight: 80 }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p
            className="font-body font-light uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: '#b8a98a',
              marginBottom: 16,
            }}
          >
            The Collection
          </p>
          <h2
            className="font-display text-4xl font-light tracking-wide text-ink md:text-5xl"
            style={{ marginBottom: 0 }}
          >
            Products
          </h2>
        </motion.div>
      </div>

      {/* Stacked collection rows or empty state */}
      {collections.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col" style={{ marginTop: 72, gap: 120 }}>
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
