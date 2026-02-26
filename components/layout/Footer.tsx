'use client'

import { useState } from 'react'
import Link from 'next/link'
import GoldRule from '@/components/ui/GoldRule'

const footerColumns = [
  {
    title: 'Collections',
    links: [
      { label: 'Eau de Parfum', href: '#' },
      { label: 'Discovery Sets', href: '#' },
      { label: 'Limited Editions', href: '#' },
      { label: 'Gift Sets', href: '#' },
    ],
  },
  {
    title: 'Maison',
    links: [
      { label: 'Our Philosophy', href: '#philosophy' },
      { label: 'Ingredients', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping & Returns', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Store Locator', href: '#' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-green-dark text-surface">
      <div className="mx-auto max-w-360 px-8 pt-section pb-12 lg:px-12">
        {/* Top section: 4 columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter column */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="font-display text-2xl font-light tracking-wide">
              Stay Close
            </h3>
            <p className="font-body text-sm font-extralight leading-relaxed text-surface/60">
              New releases, behind-the-scenes stories, and invitations — delivered thoughtfully.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full border-b border-surface/20 bg-transparent pb-3 font-body text-sm font-extralight text-surface placeholder:text-surface/40 focus:border-gold focus:outline-none"
                data-cursor="expand"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 font-body text-[10px] font-light tracking-label text-gold uppercase transition-colors hover:text-gold-light"
                data-cursor="expand"
              >
                {subscribed ? 'Thank you' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-5">
              <h4 className="font-body text-[10px] font-light tracking-label text-surface/40 uppercase">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm font-extralight text-surface/70 transition-colors duration-300 hover:text-gold"
                      data-cursor="expand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 opacity-20">
          <GoldRule />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          <img
            src="/velvora-logo-white.svg"
            alt="Velvora"
            style={{ height: 22, objectFit: 'contain' }}
          />
          <p className="font-body text-[10px] font-light text-surface/40">
            © 2026 Velvora Parfums. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Pinterest', 'TikTok'].map((social) => (
              <Link
                key={social}
                href="#"
                className="font-body text-[10px] font-light tracking-label text-surface/40 uppercase transition-colors hover:text-gold"
                data-cursor="expand"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
