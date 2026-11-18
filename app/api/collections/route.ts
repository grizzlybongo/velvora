import { NextResponse } from "next/server";
import { getCollections } from "@/lib/db";

export const dynamic = "force-dynamic";

const SUCCESS_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

/**
 * GET /api/collections
 *
 * Returns all visible collections with their ACTIVE product count.
 */
export async function GET() {
  try {
    const collections = await getCollections();
    return NextResponse.json(collections, { headers: SUCCESS_HEADERS });
  } catch (err) {
    console.error("[api] /api/collections failed", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
