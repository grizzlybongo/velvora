/**
 * Shared storefront types derived from the Prisma schema.
 * Used by both data-access functions and UI components.
 *
 * These are the "public" shapes — no internal fields, prices as strings.
 */

export type StorefrontImage = {
  url: string;
  alt: string;
};

export type StorefrontVariant = {
  id: string;
  sku: string;
  name: string;
  price: string;
  inventory: number;
};

export type StorefrontProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  compareAt: string | null;
  currency: string;
  featured: boolean;
  images: StorefrontImage[];
  variants: StorefrontVariant[];
  createdAt: string;
};

export type StorefrontCollection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  productCount: number;
  createdAt: string;
};

export type StorefrontCollectionWithProducts = Omit<
  StorefrontCollection,
  "productCount"
> & {
  products: StorefrontProduct[];
};
