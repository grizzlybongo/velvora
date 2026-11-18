'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import { fadeUp } from '@/lib/utils'
import type { StorefrontProduct } from '@/lib/db/types'

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-2xl font-light italic tracking-wide text-muted">
        Our collection is being curated.
      </p>
      <p className="mt-3 font-body text-[13px] font-light text-muted">
        Return soon to discover what we&apos;ve been composing.
      </p>
    </div>
  )
}

export default function CollectionGridClient({
  products,
}: {
  products: StorefrontProduct[]
}) {
  return (
    <section id="collections" className="bg-canvas py-section">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 space-y-4 text-center"
        >
          <p className="font-body text-[10px] font-light tracking-label text-muted uppercase">
            The Collection
          </p>
          <h2 className="font-display text-4xl font-light tracking-wide text-ink md:text-5xl">
            Signature Scents
          </h2>
          <p className="mx-auto max-w-md font-body text-sm font-extralight leading-relaxed text-muted">
            Each fragrance is a composition — layered, intentional, and impossible to forget.
          </p>
        </motion.div>

        {/* 3-col grid or empty state */}
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                priority={i === 0}
              />
            ))}
          </div>
        )}

        {/* View all CTA */}
        {products.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 text-center"
          >
            <a
              href="#products"
              className="inline-flex min-h-11 items-center justify-center border border-ink px-8 py-3.5 font-body text-[11px] font-light tracking-label text-ink uppercase transition-all duration-500 ease-luxury hover:bg-ink hover:text-surface focus-visible:bg-ink focus-visible:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
              data-cursor="expand"
            >
              View All Fragrances
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
