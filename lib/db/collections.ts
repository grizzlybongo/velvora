import { getPrisma } from "@/lib/prisma";
import type {
  StorefrontCollection,
  StorefrontCollectionWithProducts,
} from "./types";

/**
 * Get all collections with product count.
 * Returns [] if DB is unavailable.
 */
export async function getCollections(): Promise<StorefrontCollection[]> {
  try {
    const prisma = getPrisma();

    const rows = await prisma.collection.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: "desc" },
    });

    return rows.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      imageUrl: c.imageUrl,
      productCount: c._count.products,
      createdAt: c.createdAt.toISOString(),
    }));
  } catch (e) {
    console.error("[getCollections]", e);
    return [];
  }
}

/**
 * Get a single collection by slug with its ordered ACTIVE products.
 * Returns null if DB is unavailable.
 */
export async function getCollectionBySlug(
  slug: string
): Promise<StorefrontCollectionWithProducts | null> {
  try {
    const prisma = getPrisma();

    const row = await prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          orderBy: { sortOrder: "asc" },
          include: {
            product: {
              include: {
                images: { orderBy: { sortOrder: "asc" } },
                variants: { orderBy: { price: "asc" } },
              },
            },
          },
        },
      },
    });

    if (!row) return null;

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      imageUrl: row.imageUrl,
      products: row.products
        .filter((cp) => cp.product.status === "ACTIVE")
        .map((cp) => ({
          id: cp.product.id,
          name: cp.product.name,
          slug: cp.product.slug,
          description: cp.product.description,
          price: cp.product.price.toString(),
          compareAt: cp.product.compareAt?.toString() ?? null,
          currency: cp.product.currency,
          featured: cp.product.featured,
          images: cp.product.images.map((img) => ({
            url: img.url,
            alt: img.alt,
          })),
          variants: cp.product.variants.map((v) => ({
            id: v.id,
            sku: v.sku,
            name: v.name,
            price: v.price.toString(),
            inventory: v.inventory,
          })),
          createdAt: cp.product.createdAt.toISOString(),
        })),
      createdAt: row.createdAt.toISOString(),
    };
  } catch (e) {
    console.error("[getCollectionBySlug]", e);
    return null;
  }
}
