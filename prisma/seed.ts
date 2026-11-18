import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Velvora database …");

  // ── Clean slate ────────────────────────────────────────────────
  await prisma.collectionProduct.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();

  // ── Collections ────────────────────────────────────────────────

  const newArrivals = await prisma.collection.create({
    data: {
      name: "New Arrivals",
      slug: "new-arrivals",
      description:
        "The latest additions to the Velvora portfolio — contemporary compositions that redefine modern luxury.",
      imageUrl: "/images/collections/new-arrivals.jpg",
    },
  });

  const signaturePieces = await prisma.collection.create({
    data: {
      name: "Signature Pieces",
      slug: "signature-pieces",
      description:
        "Timeless fragrances that define the Velvora identity — crafted for those who leave a lasting impression.",
      imageUrl: "/images/collections/signature-pieces.jpg",
    },
  });

  console.log(`  ✓ ${2} collections created`);

  // ── Products ───────────────────────────────────────────────────

  const products = await Promise.all([
    // 1 — Noir Absolu
    prisma.product.create({
      data: {
        name: "Noir Absolu",
        slug: "noir-absolu",
        description:
          "A bold, unapologetic composition of oud, black amber, and smoked vanilla. Noir Absolu commands attention with its deep, resonant sillage — a fragrance for those who walk into a room and own it.",
        status: "ACTIVE",
        price: 185.0,
        featured: true,
        images: {
          create: [
            { url: "/images/products/noir-absolu-1.jpg", alt: "Noir Absolu bottle front", sortOrder: 0 },
            { url: "/images/products/noir-absolu-2.jpg", alt: "Noir Absolu bottle detail", sortOrder: 1 },
          ],
        },
        variants: {
          create: [
            { sku: "NA-30ML", name: "30ml", price: 95.0, inventory: 25 },
            { sku: "NA-50ML", name: "50ml", price: 145.0, inventory: 18 },
            { sku: "NA-100ML", name: "100ml", price: 185.0, inventory: 12 },
          ],
        },
      },
    }),

    // 2 — Velvet Dusk
    prisma.product.create({
      data: {
        name: "Velvet Dusk",
        slug: "velvet-dusk",
        description:
          "Where twilight meets skin. A sumptuous blend of iris butter, tonka bean, and cashmere musk that unfolds like the last hour of golden light — warm, intimate, unforgettable.",
        status: "ACTIVE",
        price: 165.0,
        featured: true,
        images: {
          create: [
            { url: "/images/products/velvet-dusk-1.jpg", alt: "Velvet Dusk bottle front", sortOrder: 0 },
            { url: "/images/products/velvet-dusk-2.jpg", alt: "Velvet Dusk packaging", sortOrder: 1 },
          ],
        },
        variants: {
          create: [
            { sku: "VD-30ML", name: "30ml", price: 85.0, inventory: 30 },
            { sku: "VD-50ML", name: "50ml", price: 130.0, inventory: 22 },
            { sku: "VD-100ML", name: "100ml", price: 165.0, inventory: 15 },
          ],
        },
      },
    }),

    // 3 — Citron Sauvage
    prisma.product.create({
      data: {
        name: "Citron Sauvage",
        slug: "citron-sauvage",
        description:
          "An untamed burst of Amalfi lemon, wild bergamot, and green vetiver, grounded by a white cedar base. Citron Sauvage is bottled sunlight for the free-spirited.",
        status: "ACTIVE",
        price: 140.0,
        featured: false,
        images: {
          create: [
            { url: "/images/products/citron-sauvage-1.jpg", alt: "Citron Sauvage bottle front", sortOrder: 0 },
          ],
        },
        variants: {
          create: [
            { sku: "CS-50ML", name: "50ml", price: 110.0, inventory: 20 },
            { sku: "CS-100ML", name: "100ml", price: 140.0, inventory: 10 },
          ],
        },
      },
    }),

    // 4 — Rose Immortelle
    prisma.product.create({
      data: {
        name: "Rose Immortelle",
        slug: "rose-immortelle",
        description:
          "A modern rose reinvented — centifolia petals meet saffron threads and dry amber. Neither sweet nor predictable, Rose Immortelle is the floral that refuses to fade.",
        status: "ACTIVE",
        price: 195.0,
        featured: true,
        images: {
          create: [
            { url: "/images/products/rose-immortelle-1.jpg", alt: "Rose Immortelle bottle front", sortOrder: 0 },
            { url: "/images/products/rose-immortelle-2.jpg", alt: "Rose Immortelle close-up", sortOrder: 1 },
          ],
        },
        variants: {
          create: [
            { sku: "RI-30ML", name: "30ml", price: 105.0, inventory: 15 },
            { sku: "RI-50ML", name: "50ml", price: 155.0, inventory: 10 },
            { sku: "RI-100ML", name: "100ml", price: 195.0, inventory: 8 },
          ],
        },
      },
    }),

    // 5 — Santal Sacré
    prisma.product.create({
      data: {
        name: "Santal Sacré",
        slug: "santal-sacre",
        description:
          "Sacred sandalwood from Mysore, enveloped in creamy coconut milk and a whisper of cardamom. A meditative scent that slows time and deepens every breath.",
        status: "ACTIVE",
        price: 175.0,
        featured: false,
        images: {
          create: [
            { url: "/images/products/santal-sacre-1.jpg", alt: "Santal Sacré bottle front", sortOrder: 0 },
          ],
        },
        variants: {
          create: [
            { sku: "SS-50ML", name: "50ml", price: 135.0, inventory: 14 },
            { sku: "SS-100ML", name: "100ml", price: 175.0, inventory: 7 },
          ],
        },
      },
    }),

    // 6 — Ambre Céleste
    prisma.product.create({
      data: {
        name: "Ambre Céleste",
        slug: "ambre-celeste",
        description:
          "Liquid gold in a bottle — labdanum absolute, benzoin resin, and honeyed tobacco leaf layered over a bed of white musk. A celestial amber that glows long after you've left.",
        status: "DRAFT",
        price: 210.0,
        featured: false,
        images: {
          create: [
            { url: "/images/products/ambre-celeste-1.jpg", alt: "Ambre Céleste bottle front", sortOrder: 0 },
          ],
        },
        variants: {
          create: [
            { sku: "AC-50ML", name: "50ml", price: 160.0, inventory: 0 },
            { sku: "AC-100ML", name: "100ml", price: 210.0, inventory: 0 },
          ],
        },
      },
    }),
  ]);

  console.log(`  ✓ ${products.length} products created`);

  // ── Collection ↔ Product joins ─────────────────────────────────

  // New Arrivals: Citron Sauvage, Santal Sacré, Ambre Céleste
  // Signature Pieces: Noir Absolu, Velvet Dusk, Rose Immortelle
  const [noirAbsolu, velvetDusk, citronSauvage, roseImmortelle, santalSacre, ambreCeleste] = products;

  await prisma.collectionProduct.createMany({
    data: [
      { collectionId: newArrivals.id, productId: citronSauvage.id, sortOrder: 0 },
      { collectionId: newArrivals.id, productId: santalSacre.id, sortOrder: 1 },
      { collectionId: newArrivals.id, productId: ambreCeleste.id, sortOrder: 2 },

      { collectionId: signaturePieces.id, productId: noirAbsolu.id, sortOrder: 0 },
      { collectionId: signaturePieces.id, productId: velvetDusk.id, sortOrder: 1 },
      { collectionId: signaturePieces.id, productId: roseImmortelle.id, sortOrder: 2 },
    ],
  });

  console.log("  ✓ Collection ↔ Product joins created");
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
