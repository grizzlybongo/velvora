export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen bg-canvas"
    >
      <span className="sr-only">Loading…</span>

      {/* Top navbar placeholder */}
      <div className="mx-auto flex h-[90px] max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="skeleton-shimmer h-5 w-28" />
        <div className="hidden gap-8 md:flex">
          <div className="skeleton-shimmer h-3 w-20" />
          <div className="skeleton-shimmer h-3 w-20" />
          <div className="skeleton-shimmer h-3 w-20" />
        </div>
        <div className="skeleton-shimmer h-4 w-16" />
      </div>

      {/* Hero skeleton block */}
      <section className="mx-auto grid w-full max-w-360 grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <div className="space-y-6">
          <div className="skeleton-shimmer h-3 w-36" />
          <div className="space-y-3">
            <div className="skeleton-shimmer h-12 w-4/5 sm:h-16" />
            <div className="skeleton-shimmer h-12 w-3/5 sm:h-16" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="skeleton-shimmer h-4 w-full max-w-md" />
            <div className="skeleton-shimmer h-4 w-4/5 max-w-md" />
          </div>
          <div className="pt-4">
            <div className="skeleton-shimmer h-11 w-48" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-lg">
          <div className="skeleton-shimmer aspect-[3/4] w-full" />
        </div>
      </section>

      {/* 3 card placeholders matching Signature Scents grid */}
      <section className="mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mb-16 flex flex-col items-center space-y-4">
          <div className="skeleton-shimmer h-3 w-28" />
          <div className="skeleton-shimmer h-10 w-64" />
          <div className="skeleton-shimmer h-4 w-72 max-w-full" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton-shimmer aspect-[3/4] w-full" />
              <div className="space-y-2">
                <div className="skeleton-shimmer h-3 w-20" />
                <div className="skeleton-shimmer h-6 w-48" />
                <div className="skeleton-shimmer h-4 w-28" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
