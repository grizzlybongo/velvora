# PROGRESS.md — Velvora Development Log

> Every PR or commit should append a bullet under **✅ Done** with: date, summary, and files touched.
> This file is the single source of truth for what has shipped, what's in flight, and what needs cleanup.

---

## ✅ Done

- **2026-02-26** — Created PROGRESS.md progress tracking file.
  - Files: `PROGRESS.md`

- **2026-02-26** — Added Prisma v7 + PostgreSQL foundation (no models yet). Installed `prisma`, `@prisma/client`, and `dotenv`. Created `prisma/schema.prisma` (generator + datasource, no models), `prisma.config.ts` (Prisma v7 config with `defineConfig`), `.env.example` (DATABASE_URL placeholder), `lib/prisma.ts` (PrismaClient singleton). Added npm scripts (`prisma:generate`, `prisma:migrate`, `prisma:studio`, `postinstall`). Build hook runs `prisma generate` before `next build`.
  - Files: `package.json`, `prisma/schema.prisma`, `prisma.config.ts`, `.env.example`, `lib/prisma.ts`, `PROGRESS.md`

- **2026-02-26** — Luxury boutique data model. Added 5 Prisma models: `Product`, `ProductImage`, `Variant`, `Collection`, `CollectionProduct` (ordered join table). Added `ProductStatus` enum (DRAFT, ACTIVE, ARCHIVED). Unique indexes on slugs and SKU. Composite indexes for performance. Created seed script with 2 collections, 6 products (with descriptions, images, and size variants). Installed `tsx` for seed runner. Updated `prisma.config.ts` with seed command.
  - Files: `prisma/schema.prisma`, `prisma/seed.ts`, `prisma.config.ts`, `package.json`, `PROGRESS.md`

- **2026-02-26** — Read-only storefront APIs. Created 4 Next.js route handlers: `GET /api/products` (filterable by `?collection=slug`, `?featured=true`, `?status=`), `GET /api/products/[slug]` (single product with images, variants, collections), `GET /api/collections` (all collections with product count), `GET /api/collections/[slug]` (collection with ordered ACTIVE products). All routes marked `force-dynamic`. Updated `lib/prisma.ts` to use Proxy-based lazy singleton (defers PrismaClient construction to runtime, preventing build-time errors without DATABASE_URL). Returns only public fields, correct HTTP status codes (400/404/500).
  - Files: `app/api/products/route.ts`, `app/api/products/[slug]/route.ts`, `app/api/collections/route.ts`, `app/api/collections/[slug]/route.ts`, `lib/prisma.ts`, `PROGRESS.md`

- **2026-02-26** — Wired storefront UI to database. Replaced hardcoded mock data in homepage product sections with live Prisma queries via server components. Created data access layer (`lib/db/`) with shared types and query functions. Split `CollectionGrid` and `Products` into server component (data fetch) + client component (Framer Motion animations). Updated `ProductCard` to use `StorefrontProduct` type from DB. Added elegant empty states ("Our collection is being curated…" / "New compositions arriving soon…") matching luxury tone. Homepage marked `force-dynamic` since it reads from DB at request time. Journal section remains on static mock data (no Journal model in DB yet). Admin pages remain on mock data (separate migration path).
  - Files: `lib/db/types.ts`, `lib/db/products.ts`, `lib/db/collections.ts`, `lib/db/index.ts`, `components/home/CollectionGrid.tsx`, `components/home/CollectionGridClient.tsx`, `components/home/Products.tsx`, `components/home/ProductsClient.tsx`, `components/ui/ProductCard.tsx`, `app/page.tsx`, `PROGRESS.md`

- **2026-02-26** — Fixed Prisma v7 runtime initialization. Installed `@prisma/adapter-pg` and updated `lib/prisma.ts` + `prisma/seed.ts` to construct `PrismaClient` with a `PrismaPg` driver adapter (required by Prisma v7 — bare `new PrismaClient()` no longer works). Seed script also loads `dotenv/config` for `DATABASE_URL`.
  - Files: `lib/prisma.ts`, `prisma/seed.ts`, `package.json`, `PROGRESS.md`

- **2026-11-17** — Aligned Prisma v7 config (`prisma.config.ts`) to use `env("DATABASE_URL")` from `"prisma/config"`, updated `.gitignore` to track `.env.example` while keeping `.env*` ignored, simplified `.env.example`, and added `db:seed` and `db:status` npm scripts. Verified local PostgreSQL connection via `prisma migrate status`, TypeScript check, and production build.
  - Files: `.gitignore`, `.env.example`, `prisma.config.ts`, `package.json`, `PROGRESS.md`

- **2026-11-18** — Replaced initial 5-model schema with the full 10-model commerce schema (`Product`, `ProductImage`, `Variant`, `Collection`, `CollectionProduct`, `Customer`, `Order`, `OrderItem`, `BlogPost`, `NewsletterSubscriber`) and 5 enums (`ProductStatus`, `OrderType`, `OrderStatus`, `PaymentMethod`, `PostStatus`) at `Decimal(10, 3)` (`MONEY_SCALE = 3` for TND). Created and applied `20261118160847_init` migration with 13 PostgreSQL `CHECK` integrity constraints (non-negative prices/inventory/amounts, slug regex format, `compareAt > price`, normalized lowercase emails) and restarted `Order_orderNumber_seq` at 1001. Regenerated Prisma Client and verified constraint enforcement.
  - Files: `prisma/schema.prisma`, `prisma/migrations/migration_lock.toml`, `prisma/migrations/20261118160847_init/migration.sql`, `PROGRESS.md`

- **2026-11-18** — Added `postgre_db_docker_mdp.md` and `*_mdp.md` to `.gitignore` to protect local Docker database credential notes and pushed baseline + schema migration commits to `origin/main` (`https://github.com/grizzlybongo/velvora.git`).
  - Files: `.gitignore`, `PROGRESS.md`

---

## 🔄 In progress

- (nothing currently)

---

## 🧹 Cleanup notes

- `package-lock.json` still has `"name": "ikira"` — will auto-fix on next `npm install`
- ~~Storefront uses static mock data in `lib/data/` — migrate to Prisma queries once models are defined~~ (done for Products/Collections — Journal remains static)
- Admin dashboard uses static mock data in `lib/data/admin.ts` — same migration path
- Placeholder images generated via `scripts/generate-placeholders.js` — replace with real product photography

---

## 🧾 Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-26 | PostgreSQL via Prisma ORM | Industry standard for relational ecommerce data. Prisma gives type-safe queries, auto-generated client, and migration tooling. Compatible with Supabase, Railway, Neon, or any Postgres host. |
| 2026-02-26 | Prisma client singleton pattern (`lib/prisma.ts`) | Prevents connection pool exhaustion during Next.js hot reload in development. Standard pattern from Prisma + Next.js docs. |
| 2026-02-26 | No models in initial Prisma setup | Clean separation of concerns — foundation first, schema design second. Avoids premature modeling before requirements are confirmed. |
| 2026-02-26 | `CollectionProduct` ordered join table | Luxury boutiques curate collection order — `sortOrder` lets admins control product display sequence per collection. |
| 2026-02-26 | Variant model for size/volume | Perfumes ship in multiple volumes (30ml/50ml/100ml). Each variant has its own SKU, price, and inventory count. |
| 2026-02-26 | `@prisma/adapter-pg` driver adapter | Prisma v7 removed built-in driver support; PrismaClient must be constructed with an explicit driver adapter. Using `PrismaPg` from `@prisma/adapter-pg` for PostgreSQL. |
| 2026-02-26 | `Decimal(10,2)` for prices | Avoids floating-point rounding errors. Serialized as strings in API responses for precision. |
| 2026-02-26 | `force-dynamic` on all API routes | API routes require database access at runtime. Prevents Next.js from attempting static pre-rendering during build (when DATABASE_URL is not set). |
| 2026-02-26 | Proxy-based lazy PrismaClient singleton | Defers `new PrismaClient()` to first property access at runtime. Safe for `next build` without a live database. Still reuses a single instance across hot reloads in dev. |
| 2026-02-26 | Server/Client component split for DB-fetching sections | Server components (`CollectionGrid`, `Products`) fetch data via Prisma, then pass serializable props to client components (`CollectionGridClient`, `ProductsClient`) for Framer Motion animations. Clean separation of data fetching and interactivity. |
| 2026-02-26 | Homepage `force-dynamic` | Homepage now reads products/collections from DB — cannot be statically pre-rendered without a database connection. Server-rendered on demand. |
| 2026-02-26 | Data access layer in `lib/db/` | Centralises all Prisma queries in reusable functions with typed return values. Shared between server components and API routes. Avoids duplicating query logic. |
