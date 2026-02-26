'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { luxuryEase } from '@/lib/utils'

const heroLines = [
  { text: 'More Than', className: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl' },
  { text: 'a Scent—', className: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic' },
  { text: "It's Your", className: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl' },
  { text: 'Statement.', className: 'text-6xl md:text-7xl lg:text-8xl xl:text-9xl' },
]

const lineVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.9,
      ease: luxuryEase,
    },
  }),
}

const imageVariant = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 1.2,
      ease: luxuryEase,
    },
  },
}

const taglineVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.9,
      duration: 0.7,
      ease: luxuryEase,
    },
  },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-canvas pt-nav">
      <div className="mx-auto grid w-full max-w-360 grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2 lg:gap-0 lg:px-12">
        {/* Left: Typography */}
        <div className="relative z-10 space-y-8">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-body text-[10px] font-light tracking-label text-muted uppercase"
          >
            Niche Perfumery — Est. 2019
          </motion.p>

          {/* Headline */}
          <h1 className="overflow-hidden">
            {heroLines.map((line, i) => (
              <motion.span
                key={line.text}
                variants={lineVariant}
                initial="hidden"
                animate="visible"
                custom={i}
                className={`block font-display leading-[1.05] font-light tracking-wide text-ink ${line.className}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Tagline + CTA */}
          <motion.div
            variants={taglineVariant}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <p className="max-w-sm font-body text-base font-extralight leading-relaxed text-muted">
              Hand-crafted fragrances that linger in the minds of those you pass.
              Each scent tells a story only the wearer knows.
            </p>
            <a
              href="#collections"
              className="inline-block border border-ink px-8 py-3.5 font-body text-[11px] font-light tracking-label text-ink uppercase transition-all duration-500 ease-luxury hover:bg-ink hover:text-surface"
              data-cursor="expand"
            >
              Explore the Collection
            </a>
          </motion.div>
        </div>

        {/* Right: Hero image */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          className="relative aspect-3/4 w-full lg:aspect-auto lg:h-[85vh]"
        >
          <Image
            src="/images/hero/hero-bottle.jpg"
            alt="Velvora signature fragrance bottle"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 bg-linear-to-r from-canvas via-transparent to-transparent lg:block hidden" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[9px] font-light tracking-label text-muted uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-6 w-px bg-muted"
          />
        </div>
      </motion.div>
    </section>
  )
}
