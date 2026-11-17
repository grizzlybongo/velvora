import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "[Velvora] DATABASE_URL is not set. " +
        "Copy .env.example to .env and set your PostgreSQL connection string."
    );
  }
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

// Re-use the same client across hot-reloads in development.
// In production a single instance is created per cold start.
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = makePrismaClient();
  }
  return globalForPrisma.prisma;
}
