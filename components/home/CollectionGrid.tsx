'use client'

import { motion } from 'framer-motion'
import { products } from '@/lib/data/products'
import ProductCard from '@/components/ui/ProductCard'
import { fadeUp } from '@/lib/utils'

export default function CollectionGrid() {
  const featured = products.filter((p) => p.featured)

  return (
    <section id="collections" className="bg-canvas py-section">
      <div className="mx-auto max-w-360 px-8 lg:px-12">
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

        {/* 3-col grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 text-center"
        >
          <a
            href="#products"
            className="inline-block border border-ink px-8 py-3.5 font-body text-[11px] font-light tracking-label text-ink uppercase transition-all duration-500 ease-luxury hover:bg-ink hover:text-surface"
            data-cursor="expand"
          >
            View All Fragrances
          </a>
        </motion.div>
      </div>
    </section>
  )
}
