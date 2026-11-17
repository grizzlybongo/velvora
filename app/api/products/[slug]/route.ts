import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/products/[slug]
 *
 * Returns a single product with images, variants, and collection memberships.
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
        { error: "Product slug is required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: { orderBy: { price: "asc" } },
        collections: {
          include: {
            collection: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    // Only expose ACTIVE products publicly
    if (product.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const result = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price.toString(),
      compareAt: product.compareAt?.toString() ?? null,
      currency: product.currency,
      featured: product.featured,
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
      })),
      variants: product.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        price: v.price.toString(),
        inventory: v.inventory,
      })),
      collections: product.collections.map((cp) => ({
        id: cp.collection.id,
        name: cp.collection.name,
        slug: cp.collection.slug,
      })),
      createdAt: product.createdAt.toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/products/[slug]]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
