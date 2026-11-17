import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/collections/[slug]
 *
 * Returns a single collection with its ordered products (ACTIVE only).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const prisma = getPrisma();
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Collection slug is required." },
        { status: 400 }
      );
    }

    const collection = await prisma.collection.findUnique({
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

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found." },
        { status: 404 }
      );
    }

    // Filter to only ACTIVE products and map to public shape
    const result = {
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      imageUrl: collection.imageUrl,
      products: collection.products
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
        })),
      createdAt: collection.createdAt.toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/collections/[slug]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
