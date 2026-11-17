'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { fadeUp } from '@/lib/utils'
import type { StorefrontProduct } from '@/lib/db/types'

interface ProductCardProps {
  product: StorefrontProduct
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const heroImage = product.images[0]

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      custom={index}
      className="group"
      data-cursor="expand"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative mb-5 aspect-3/4 overflow-hidden bg-[#f4f2ee]">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-body text-[10px] font-light uppercase"
                style={{ letterSpacing: '0.2em', color: '#8a8a82', opacity: 0.5 }}
              >
                {product.name}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-green-dark/0 transition-colors duration-500 group-hover:bg-green-dark/10" />

          {/* Quick view label */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center pb-6 transition-transform duration-500 ease-luxury group-hover:translate-y-0">
            <span className="bg-ink px-6 py-2.5 font-body text-[11px] font-light tracking-label text-surface uppercase">
              Quick View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="font-body text-[10px] font-light tracking-label text-muted uppercase">
            {product.currency}
          </p>
          <h3 className="font-display text-xl font-light tracking-wide text-ink">
            {product.name}
          </h3>
          <p className="font-body text-sm font-extralight text-muted line-clamp-1">
            {product.description}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
