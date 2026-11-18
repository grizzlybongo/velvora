'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Storefront Error Boundary]', error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-5 py-24 text-center sm:px-8">
      <div className="mx-auto max-w-lg space-y-6">
        <p className="font-body text-[10px] font-light tracking-label text-gold uppercase">
          Maison Velvora
        </p>

        <h1 className="font-display text-3xl font-light italic tracking-wide text-ink sm:text-4xl md:text-5xl">
          Something interrupted the composition…
        </h1>

        <p className="font-body text-sm font-extralight leading-relaxed text-muted">
          We encountered a temporary disturbance while preparing this page.
          Please try again in a moment, or return to the salon.
        </p>

        {error.digest && (
          <p className="font-body text-[11px] font-light text-muted/70">
            Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-8 py-3 font-body text-[11px] font-light tracking-label text-surface uppercase transition-all duration-500 ease-luxury hover:bg-transparent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            data-cursor="expand"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center border border-ink px-8 py-3 font-body text-[11px] font-light tracking-label text-ink uppercase transition-all duration-500 ease-luxury hover:bg-ink hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            data-cursor="expand"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}
