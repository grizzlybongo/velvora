/**
 * Shared storefront types derived from the Prisma schema.
 * Used by both public data-access functions and UI components.
 *
 * These are the ONLY shapes the storefront and public API may expose.
 * Never expose: inventory numbers, threshold, status, sku, createdAt/updatedAt,
 * or internal IDs of join rows.
 */

export type StorefrontImage = {
  url: string;
  alt: string | null;
};

export type StorefrontVariant = {
  id: string;
  name: string;
  price: string;
  compareAt: string | null;
  inStock: boolean;
  lowStock: boolean;
};

export type StorefrontProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  family: string | null;
  scentNotes: string[];
  description: string;
  price: string;
  cardColor: string | null;
  textColor: string | null;
  images: StorefrontImage[];
  variants: StorefrontVariant[];
  inStock: boolean;
};

export type StorefrontCollection = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  productCount: number;
};

export type StorefrontCollectionWithProducts = StorefrontCollection & {
  products: StorefrontProduct[];
};
