import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatPrice as formatStorePrice } from '@/lib/money'

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format price as currency */
export function formatPrice(price: string | number): string {
  return formatStorePrice(price)
}

/** Luxury easing curve */
export const luxuryEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/** Shared fade-up animation variant for Framer Motion */
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: luxuryEase,
    },
  }),
}

/** Shared fade-in animation variant */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: luxuryEase,
    },
  }),
}
