'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, luxuryEase } from '@/lib/utils'

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-green-dark py-section text-surface">
      <div className="mx-auto grid max-w-360 grid-cols-1 items-center gap-16 px-8 lg:grid-cols-2 lg:px-12">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: luxuryEase }}
          className="relative aspect-square overflow-hidden"
        >
          <Image
            src="/images/editorial/philosophy.jpg"
            alt="Velvora ingredients and raw materials"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Right: Text */}
        <div className="space-y-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-body text-[10px] font-light tracking-label text-gold uppercase"
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
            className="font-display text-4xl leading-snug font-light tracking-wide md:text-5xl"
          >
            Fragrance as
            <br />
            <span className="italic">an act of presence</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={2}
            className="space-y-5"
          >
            <p className="max-w-md font-body text-base font-extralight leading-relaxed text-surface/70">
              At Velvora, we believe that every scent tells a story —
              a whisper of memories, emotions, and dreams. We don&apos;t
              just craft perfumes; we curate olfactory experiences
              that mirror your inner world.
            </p>
            <p className="max-w-md font-body text-base font-extralight leading-relaxed text-surface/70">
              Our approach to luxury is built on conviction: ethically
              sourced ingredients, eco-conscious production, and
              small-batch artisanal quality — because true luxury
              leaves nothing compromised.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={3}
          >
            <a
              href="#"
              className="inline-block border border-surface/30 px-8 py-3.5 font-body text-[11px] font-light tracking-label uppercase transition-all duration-500 ease-luxury hover:border-gold hover:text-gold"
              data-cursor="expand"
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
