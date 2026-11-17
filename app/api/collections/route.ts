import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/collections
 *
 * Returns all collections with product count.
 */
export async function GET() {
  try {
    const prisma = getPrisma();

    const collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = collections.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      imageUrl: c.imageUrl,
      productCount: c._count.products,
      createdAt: c.createdAt.toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/collections]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
