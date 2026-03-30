import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare function setupTestDatabase(): Promise<void>;
export declare function cleanupTestDatabase(): Promise<void>;
export { prisma };
//# sourceMappingURL=setup.d.ts.map