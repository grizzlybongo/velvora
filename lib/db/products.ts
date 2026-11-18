// PUBLIC read layer. ACTIVE/visible only. Admin queries go in lib/db/admin/* (later), never here.

import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import type { StorefrontProduct, StorefrontVariant } from "./types";

export const publicProductSelect = {
  id: true,
  slug: true,
  name: true,
  tagline: true,
  family: true,
  scentNotes: true,
  description: true,
  price: true,
  cardColor: true,
  textColor: true,
  images: {
    orderBy: { sortOrder: "asc" as const },
    select: {
      url: true,
      alt: true,
    },
  },
  variants: {
    orderBy: { sortOrder: "asc" as const },
    select: {
      id: true,
      name: true,
      price: true,
      compareAt: true,
      inventory: true,
      threshold: true,
    },
  },
} satisfies Prisma.ProductSelect;

export type SelectedPublicProduct = Prisma.ProductGetPayload<{
  select: typeof publicProductSelect;
}>;

export function mapStorefrontProduct(
  p: SelectedPublicProduct
): StorefrontProduct {
  const variants: StorefrontVariant[] = p.variants.map((v) => ({
    id: v.id,
    name: v.name,
    price: v.price.toString(),
    compareAt: v.compareAt !== null ? v.compareAt.toString() : null,
    inStock: v.inventory > 0,
    lowStock: v.inventory > 0 && v.inventory <= v.threshold,
  }));

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    family: p.family,
    scentNotes: p.scentNotes,
    description: p.description,
    price: p.price.toString(),
    cardColor: p.cardColor,
    textColor: p.textColor,
    images: p.images.map((img) => ({
      url: img.url,
      alt: img.alt,
    })),
    variants,
    inStock: variants.some((v) => v.inStock),
  };
}

/**
 * Get ACTIVE products, optionally filtered by featured flag, visible collection slug, and limit.
 */
export async function getProducts(opts?: {
  featured?: boolean;
  collectionSlug?: string;
  limit?: number;
}): Promise<StorefrontProduct[]> {
  const prisma = getPrisma();

  const where: Prisma.ProductWhereInput = {
    status: "ACTIVE",
  };

  if (opts?.featured !== undefined) {
    where.featured = opts.featured;
  }

  if (opts?.collectionSlug) {
    where.collections = {
      some: {
        collection: {
          slug: opts.collectionSlug,
          visible: true,
        },
      },
    };
  }

  const rows = await prisma.product.findMany({
    where,
    select: publicProductSelect,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    ...(opts?.limit !== undefined ? { take: opts.limit } : {}),
  });

  return rows.map(mapStorefrontProduct);
}

/**
 * Get a single ACTIVE product by slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<StorefrontProduct | null> {
  const prisma = getPrisma();

  const row = await prisma.product.findFirst({
    where: {
      slug,
      status: "ACTIVE",
    },
    select: publicProductSelect,
  });

  if (!row) return null;

  return mapStorefrontProduct(row);
}
