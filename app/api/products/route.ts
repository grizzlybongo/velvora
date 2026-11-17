import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/products
 *
 * Query params:
 *   ?collection=<slug>   — filter by collection slug
 *   ?featured=true       — only featured products
 *   ?status=ACTIVE       — filter by status (default: ACTIVE only)
 */
export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const { searchParams } = request.nextUrl;
    const collectionSlug = searchParams.get("collection");
    const featured = searchParams.get("featured");
    const status = searchParams.get("status") ?? "ACTIVE";

    // Validate status
    const validStatuses = ["DRAFT", "ACTIVE", "ARCHIVED"] as const;
    if (!validStatuses.includes(status as (typeof validStatuses)[number])) {
      return NextResponse.json(
        { error: "Invalid status. Must be DRAFT, ACTIVE, or ARCHIVED." },
        { status: 400 }
      );
    }

    // Build where clause
    const where: Record<string, unknown> = {
      status: status as (typeof validStatuses)[number],
    };

    if (featured === "true") {
      where.featured = true;
    }

    if (collectionSlug) {
      where.collections = {
        some: {
          collection: { slug: collectionSlug },
        },
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
        },
        variants: {
          orderBy: { price: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Map to public shape (strip internal fields)
    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price.toString(),
      compareAt: p.compareAt?.toString() ?? null,
      currency: p.currency,
      featured: p.featured,
      images: p.images.map((img) => ({
        url: img.url,
        alt: img.alt,
      })),
      variants: p.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        price: v.price.toString(),
        inventory: v.inventory,
      })),
      createdAt: p.createdAt.toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
