import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    // Use process.env directly so `prisma generate` works
    // even when DATABASE_URL is not set (e.g. CI type-check).
    url: process.env.DATABASE_URL ?? "",
  },
});
