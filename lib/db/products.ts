import { getPrisma } from "@/lib/prisma";
import type { StorefrontProduct } from "./types";

/**
 * Get all ACTIVE products, optionally filtered.
 * Returns [] if DB is unavailable.
 */
export async function getProducts(opts?: {
  featured?: boolean;
  collectionSlug?: string;
}): Promise<StorefrontProduct[]> {
  try {
    const prisma = getPrisma();

    const where: Record<string, unknown> = { status: "ACTIVE" };

    if (opts?.featured) where.featured = true;
    if (opts?.collectionSlug) {
      where.collections = {
        some: { collection: { slug: opts.collectionSlug } },
      };
    }

    const rows = await prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return rows.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price.toString(),
      compareAt: p.compareAt?.toString() ?? null,
      currency: p.currency,
      featured: p.featured,
      images: p.images.map((img) => ({ url: img.url, alt: img.alt })),
      variants: p.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        price: v.price.toString(),
        inventory: v.inventory,
      })),
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (e) {
    console.error("[getProducts]", e);
    return [];
  }
}

/**
 * Get a single ACTIVE product by slug.
 * Returns null if DB is unavailable.
 */
export async function getProductBySlug(
  slug: string
): Promise<StorefrontProduct | null> {
  try {
    const prisma = getPrisma();

    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { price: "asc" } },
      },
    });

    if (!p || p.status !== "ACTIVE") return null;

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price.toString(),
      compareAt: p.compareAt?.toString() ?? null,
      currency: p.currency,
      featured: p.featured,
      images: p.images.map((img) => ({ url: img.url, alt: img.alt })),
      variants: p.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        price: v.price.toString(),
        inventory: v.inventory,
      })),
      createdAt: p.createdAt.toISOString(),
    };
  } catch (e) {
    console.error("[getProductBySlug]", e);
    return null;
  }
}
