'use client'

import { motion } from 'framer-motion'
import { Leaf, Recycle, Feather } from 'lucide-react'
import { fadeUp } from '@/lib/utils'

const pillars = [
  {
    icon: Leaf,
    label: 'ETHICAL SOURCING',
    text: 'Ingredients gathered with respect for the land and the harvesters — nothing extracted at cost.',
  },
  {
    icon: Recycle,
    label: 'ECO-CONSCIOUS',
    text: 'Recyclable glass, biodegradable packaging. As kind to the earth as we are to your skin.',
  },
  {
    icon: Feather,
    label: 'ARTISANAL QUALITY',
    text: 'Small-batch production. Every bottle held to a standard that mass production cannot meet.',
  },
]

export default function WhyVelvora() {
  return (
    <section
      className="bg-canvas"
      style={{ paddingTop: 120, paddingBottom: 120, paddingLeft: 80, paddingRight: 80 }}
    >
      <div className="mx-auto max-w-360">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
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
            Why Velvora
          </p>
          <h2
            className="font-display font-light tracking-wide text-ink"
            style={{ fontSize: 34 }}
          >
            Conscious Luxury, Without Compromise.
          </h2>
        </motion.div>

        {/* Three-column pillar cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                className="bg-surface"
                style={{
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: 4,
                  padding: '40px 32px',
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: '#c9a96e', marginBottom: 20 }}
                />
                <p
                  className="font-body font-light uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    color: '#c9a96e',
                    marginBottom: 14,
                  }}
                >
                  {pillar.label}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#7a7a72',
                  }}
                >
                  {pillar.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
