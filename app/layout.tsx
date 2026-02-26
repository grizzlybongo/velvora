import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'

const cormorant = localFont({
  src: [
    { path: '../public/fonts/CormorantGaramond-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/CormorantGaramond-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/CormorantGaramond-LightItalic.woff2', weight: '300', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const dmSans = localFont({
  src: [
    { path: '../public/fonts/DMSans-ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../public/fonts/DMSans-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/DMSans-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Velvora | Crafting Scents That Inspire',
  description:
    'At Velvora, we blend artistry and science to create fragrances that resonate deeply with individuality and self-expression.',
  keywords: ['perfume', 'fragrance', 'niche perfumery', 'luxury', 'Velvora'],
  openGraph: {
    title: 'Velvora | Crafting Scents That Inspire',
    description: 'At Velvora, we blend artistry and science to create fragrances that resonate deeply with individuality and self-expression.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
