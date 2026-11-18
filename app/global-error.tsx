'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F4F0',
          color: '#0A0A0A',
          fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <main style={{ maxWidth: '480px', width: '100%' }}>
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#B8963E',
              marginBottom: '16px',
            }}
          >
            Maison Velvora
          </p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '36px',
              fontWeight: 300,
              fontStyle: 'italic',
              margin: '0 0 16px',
            }}
          >
            Something interrupted the composition…
          </h1>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.6,
              color: '#6B6B6B',
              margin: '0 0 24px',
            }}
          >
            An unexpected interruption occurred. Please try again or return to
            the homepage.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: '11px',
                color: '#6B6B6B',
                marginBottom: '24px',
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                minHeight: '44px',
                padding: '12px 28px',
                border: '1px solid #0A0A0A',
                backgroundColor: '#0A0A0A',
                color: '#FFFFFF',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 28px',
                border: '1px solid #0A0A0A',
                color: '#0A0A0A',
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Return Home
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
