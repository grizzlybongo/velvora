'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  productCategories,
  getProductsByCategory,
  type Product,
  type ProductCategory,
} from '@/lib/data/products'
import { fadeUp } from '@/lib/utils'

/* ─────────────────────────────────────────────
   Product Card — discovery surface, no price
   Larger, taller cards that command attention
   ───────────────────────────────────────────── */

function ProductCard({ product }: { product: Product }) {
  const hasImage = !!product.image

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block shrink-0 snap-start"
      data-cursor="expand"
    >
      {/* Color block / Image — tall 3:4.5 proportion */}
      <div
        className="product-card-block relative overflow-hidden"
        style={{
          backgroundColor: product.cardColor,
        }}
      >
        {hasImage ? (
          <Image
            src={product.image!}
            alt={product.name}
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
                color: product.textColor,
                opacity: 0.7,
              }}
            >
              {product.name}
            </span>
            <span
              className="font-body text-[9px] font-light uppercase"
              style={{
                letterSpacing: '0.15em',
                color: product.textColor,
                opacity: 0.4,
              }}
            >
              Placeholder
            </span>
          </div>
        )}

        {/* Hover brightness overlay for images */}
        {hasImage && (
          <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/4" />
        )}

        {/* Non-image blocks get a subtle brightness lift */}
        {!hasImage && (
          <div className="pointer-events-none absolute inset-0 transition-[filter] duration-300 group-hover:brightness-[1.06]" />
        )}
      </div>

      {/* Card info — below, open layout with generous spacing */}
      <div style={{ marginTop: 20 }}>
        {/* Category tag */}
        <p
          className="font-body font-light uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#8a8a82', marginBottom: 8 }}
        >
          {product.family}
        </p>

        {/* Product name */}
        <h3
          className="font-display font-normal transition-colors duration-300"
          style={{ fontSize: 22, lineHeight: 1.25, color: '#1a1a18', marginBottom: 6 }}
        >
          <span className="group-hover:text-[#0e0e0c]">{product.name}</span>
        </h3>

        {/* One-line descriptor */}
        <p
          className="font-body font-light italic"
          style={{ fontSize: 14, lineHeight: 1.5, color: '#8a8a82' }}
        >
          {product.descriptor}
          {/* Underline animation */}
          <span className="mt-1.5 block h-px w-0 bg-[#8a8a82]/40 transition-all duration-250 ease-out group-hover:w-full" />
        </p>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────
   Category Row — independent horizontal scroll
   ───────────────────────────────────────────── */

function CategoryRow({
  category,
  index,
  isLast,
}: {
  category: ProductCategory
  index: number
  isLast: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const categoryProducts = getProductsByCategory(category.id)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = 400 + 24 // ~card width + gap
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  if (categoryProducts.length === 0) return null

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
              {category.eyebrow}
            </p>
            <h3
              className="font-display font-light tracking-wide text-ink"
              style={{ fontSize: 28 }}
            >
              {category.title}
            </h3>
          </div>

          {/* Arrows — vertically aligned with bottom of title */}
          <div className="hidden gap-3 md:flex" style={{ marginBottom: 2 }}>
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center border border-rule transition-colors hover:border-ink"
              data-cursor="expand"
              aria-label={`Scroll ${category.title} left`}
            >
              <span className="font-body text-sm text-ink">←</span>
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center border border-rule transition-colors hover:border-ink"
              data-cursor="expand"
              aria-label={`Scroll ${category.title} right`}
            >
              <span className="font-body text-sm text-ink">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track — generous padding */}
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
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* End spacer for scroll breathing room */}
        <div className="shrink-0" style={{ width: 40 }} />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Products Section — THE COLLECTION
   ───────────────────────────────────────────── */

export default function Products() {
  return (
    <section
      id="products"
      className="bg-surface"
      style={{ scrollMarginTop: '80px', paddingTop: 120, paddingBottom: 160 }}
    >
      {/* Section header — once at the top */}
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

      {/* Stacked category rows — generous vertical rhythm */}
      <div className="flex flex-col" style={{ marginTop: 72, gap: 120 }}>
        {productCategories.map((cat, i) => (
          <CategoryRow
            key={cat.id}
            category={cat}
            index={i}
            isLast={i === productCategories.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
