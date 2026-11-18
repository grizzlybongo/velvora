import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/db";
import { isValidSlug, parseBool, parseLimit } from "@/lib/validation";

export const dynamic = "force-dynamic";

const SUCCESS_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

/**
 * GET /api/products
 *
 * Public read-only endpoint returning ACTIVE products only.
 * Query params:
 *   ?featured=true|false
 *   ?collection=<slug>
 *   ?limit=1..100 (default 24)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const featured = parseBool(searchParams.get("featured"));
    if (featured === "invalid") {
      return NextResponse.json(
        { error: "Invalid parameter: featured" },
        { status: 400 }
      );
    }

    const collectionParam = searchParams.get("collection");
    if (collectionParam !== null && !isValidSlug(collectionParam)) {
      return NextResponse.json(
        { error: "Invalid parameter: collection" },
        { status: 400 }
      );
    }

    const limit = parseLimit(searchParams.get("limit"));
    if (limit === "invalid") {
      return NextResponse.json(
        { error: "Invalid parameter: limit" },
        { status: 400 }
      );
    }

    const products = await getProducts({
      featured,
      collectionSlug: collectionParam ?? undefined,
      limit,
    });

    return NextResponse.json(products, { headers: SUCCESS_HEADERS });
  } catch (err) {
    console.error("[api] /api/products failed", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
