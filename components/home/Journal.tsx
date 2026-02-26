'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { journalEntries } from '@/lib/data/journal'
import { fadeUp } from '@/lib/utils'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-2xl font-light italic tracking-wide text-muted">
        The first entry is being composed.
      </p>
      <p className="mt-3 font-body text-[13px] font-light text-muted">
        Return soon.
      </p>
    </div>
  )
}

export default function Journal() {
  return (
    <section
      id="journal"
      className="bg-canvas py-section"
      style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="mx-auto max-w-360 px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 space-y-4 text-center"
        >
          <p
            className="font-body font-light uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: '#b8a98a',
            }}
          >
            The Journal
          </p>
          <h2
            className="font-display font-light tracking-wide text-ink"
            style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}
          >
            Stories & Craft
          </h2>
        </motion.div>

        {/* Cards or Empty State */}
        {journalEntries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* 3-Column Card Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {journalEntries.map((entry, i) => (
                <motion.article
                  key={entry.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  className="group"
                >
                  <a
                    href={`/journal/${entry.slug}`}
                    className="block"
                    data-cursor="expand"
                  >
                    {/* Image — 3:4 aspect ratio */}
                    <div className="relative mb-5 aspect-3/4 overflow-hidden bg-surface">
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle gradient overlay on hover */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Category Tag */}
                    <p
                      className="mb-2.5 font-body font-light uppercase"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.25em',
                        color: '#b8a98a',
                      }}
                    >
                      {entry.category}
                    </p>

                    {/* Title */}
                    <h3
                      className="mb-2 font-display font-normal leading-snug text-ink transition-colors duration-300 group-hover:text-green"
                      style={{ fontSize: '21px' }}
                    >
                      {entry.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="mb-4 font-body font-light leading-relaxed"
                      style={{ fontSize: '13px', color: '#8a8a82' }}
                    >
                      {entry.excerpt}
                    </p>

                    {/* Meta: Read Time + Date */}
                    <div
                      className="mb-4 flex items-center gap-3"
                      style={{ fontSize: '11px', color: '#aaaaaa' }}
                    >
                      <span className="font-body">{entry.readTime}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-body">{formatDate(entry.date)}</span>
                    </div>

                    {/* Read More Link */}
                    <span className="inline-block font-body text-xs font-light tracking-wide text-ink">
                      Read More
                      <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                      {/* Underline animation */}
                      <span className="mt-0.5 block h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
                    </span>
                  </a>
                </motion.article>
              ))}
            </div>

            {/* View All Entries CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-16 text-center"
            >
              <a
                href="/journal"
                className="group/cta inline-flex items-center gap-2 font-body text-[11px] font-light uppercase tracking-label text-ink transition-colors duration-300 hover:text-green"
                data-cursor="expand"
              >
                View All Entries
                <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
