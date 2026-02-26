'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

/* ─── SVG Icons ─── */
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

/* ─── Expandable icon + text component ─── */
function InfoLink({
  icon,
  text,
  href,
  external = false,
}: {
  icon: React.ReactNode
  text: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex h-8 items-center gap-1.5 text-[#5a5a52] transition-colors duration-300 hover:text-ink"
      data-cursor="expand"
    >
      <span className="flex shrink-0 items-center justify-center">{icon}</span>
      <span className="whitespace-nowrap font-body text-[11px] font-light tracking-[0.08em]">
        {text}
      </span>
    </a>
  )
}

/* ─── Nav links ─── */
const navLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Blog', href: '#journal' },
  { label: 'Products', href: '#products' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(245, 243, 239, ${v})`),
        borderBottomColor: useTransform(borderOpacity, (v) => `rgba(226, 224, 218, ${v})`),
        borderBottomWidth: 1,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Row 1: Top Info Bar — full-bleed, fixed right margin ── */}
      <div
        className="flex h-8 w-full items-center justify-end gap-5 pr-6"
        style={{
          backgroundColor: '#f0ede8',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <InfoLink
          icon={<PhoneIcon />}
          text="+216 56 680 001"
          href="tel:+21656680001"
        />
        <InfoLink
          icon={<InstagramIcon />}
          text="@velvora_officiel"
          href="https://www.instagram.com/velvora_officiel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          external
        />
      </div>

      {/* ── Row 2: Main Navigation — fixed 80px ── */}
      <nav
        className="relative mx-auto flex max-w-360 items-center justify-between px-8 lg:px-12"
        style={{ height: 80 }}
      >
        {/* Logo — left anchor. SVG exported from .ai — preserves script paths at small sizes. */}
        <Link href="/" className="flex shrink-0 items-center" style={{ height: 60 }} data-cursor="expand">
          <img
            src="/velvora-logo-black.svg"
            alt="Velvora"
            className="md:h-[52px] lg:h-[56px] xl:h-[60px]"
            style={{
              height: 48,          /* mobile baseline */
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              marginLeft: -4,      /* optical left-edge correction for script overhang */
              filter: 'brightness(0) opacity(0.82)', /* softened to match muted nav-link tone */
            }}
          />
        </Link>

        {/* Nav links — absolutely centered to viewport, not pushed by logo width */}
        <ul
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group/link relative font-body text-[11px] font-light tracking-label text-muted uppercase transition-colors duration-300 hover:text-ink"
                data-cursor="expand"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxury group-hover/link:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="font-body text-[11px] font-light tracking-label text-muted uppercase transition-colors duration-300 hover:text-ink"
            data-cursor="expand"
          >
            Cart (0)
          </Link>

          {/* Mobile menu button */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            data-cursor="expand"
            aria-label="Menu"
          >
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
