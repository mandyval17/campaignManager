// src/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow globalThis.prisma across modules
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// In production, we want exactly one instance;
// in development we’ll cache it on globalThis to avoid hot-reload leaks.
const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

// If we’re in dev, lock the instance into the global so on HMR
// you don’t end up creating >1 client.
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Connect immediately (optional—Prisma will connect lazily on first query)
prisma
  .$connect()
  .then(() => console.log('✅ Prisma connected.'))
  .catch((e) => {
    console.error('❌ Prisma failed to connect:', e);
    return prisma.$disconnect();
  });

// Cleanly disconnect on process end
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  console.log('✅ Prisma disconnected.');
});

export default prisma;
