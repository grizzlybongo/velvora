import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/db";
import { isValidSlug } from "@/lib/validation";

export const dynamic = "force-dynamic";

const SUCCESS_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

/**
 * GET /api/products/[slug]
 *
 * Returns a single ACTIVE product by slug.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product, { headers: SUCCESS_HEADERS });
  } catch (err) {
    console.error("[api] /api/products/[slug] failed", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
