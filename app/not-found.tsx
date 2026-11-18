import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-5 py-24 text-center sm:px-8">
      <div className="mx-auto max-w-lg space-y-6">
        <p className="font-body text-[10px] font-light tracking-label text-gold uppercase">
          404 — Page Not Found
        </p>

        <h1 className="font-display text-3xl font-light italic tracking-wide text-ink sm:text-4xl md:text-5xl">
          This scent has drifted away…
        </h1>

        <p className="font-body text-sm font-extralight leading-relaxed text-muted">
          The page you are looking for does not exist or may have moved.
          Explore our current compositions below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-8 py-3 font-body text-[11px] font-light tracking-label text-surface uppercase transition-all duration-500 ease-luxury hover:bg-transparent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            data-cursor="expand"
          >
            Return Home
          </Link>

          <Link
            href="/#collections"
            className="inline-flex min-h-11 items-center justify-center border border-ink px-8 py-3 font-body text-[11px] font-light tracking-label text-ink uppercase transition-all duration-500 ease-luxury hover:bg-ink hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            data-cursor="expand"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </main>
  )
}
