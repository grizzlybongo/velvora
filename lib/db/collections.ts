// PUBLIC read layer. ACTIVE/visible only. Admin queries go in lib/db/admin/* (later), never here.

import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { mapStorefrontProduct, publicProductSelect } from "./products";
import type {
  StorefrontCollection,
  StorefrontCollectionWithProducts,
} from "./types";

const homepageProductSelect = {
  ...publicProductSelect,
  images: {
    orderBy: { sortOrder: "asc" as const },
    take: 1,
    select: {
      url: true,
      alt: true,
    },
  },
} satisfies Prisma.ProductSelect;

/**
 * Get all visible collections with ACTIVE product count.
 */
export async function getCollections(): Promise<StorefrontCollection[]> {
  const prisma = getPrisma();

  const rows = await prisma.collection.findMany({
    where: { visible: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      imageUrl: true,
      metaTitle: true,
      metaDescription: true,
      _count: {
        select: {
          products: {
            where: {
              product: { status: "ACTIVE" },
            },
          },
        },
      },
    },
  });

  return rows.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    imageUrl: c.imageUrl,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    productCount: c._count.products,
  }));
}

/**
 * Get a single visible collection by slug with its ordered ACTIVE products.
 */
export async function getCollectionBySlug(
  slug: string
): Promise<StorefrontCollectionWithProducts | null> {
  const prisma = getPrisma();

  const row = await prisma.collection.findFirst({
    where: {
      slug,
      visible: true,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      imageUrl: true,
      metaTitle: true,
      metaDescription: true,
      products: {
        where: {
          product: { status: "ACTIVE" },
        },
        orderBy: { sortOrder: "asc" },
        select: {
          product: {
            select: publicProductSelect,
          },
        },
      },
    },
  });

  if (!row) return null;

  const products = row.products.map((cp) => mapStorefrontProduct(cp.product));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    imageUrl: row.imageUrl,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    productCount: products.length,
    products,
  };
}

/**
 * Get visible homepage-featured collections and their ACTIVE products in ONE query.
 * Each product selects only its first image (take: 1) and variants ordered by sortOrder.
 */
export async function getHomepageCollections(): Promise<
  StorefrontCollectionWithProducts[]
> {
  const prisma = getPrisma();

  const rows = await prisma.collection.findMany({
    where: {
      visible: true,
      featuredOnHomepage: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      imageUrl: true,
      metaTitle: true,
      metaDescription: true,
      products: {
        where: {
          product: { status: "ACTIVE" },
        },
        orderBy: { sortOrder: "asc" },
        select: {
          product: {
            select: homepageProductSelect,
          },
        },
      },
    },
  });

  return rows.map((row) => {
    const products = row.products.map((cp) => mapStorefrontProduct(cp.product));
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description,
      imageUrl: row.imageUrl,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      productCount: products.length,
      products,
    };
  });
}
