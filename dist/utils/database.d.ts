import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient<{
    log: ("info" | "error" | "query" | "warn")[];
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare function testConnection(): Promise<boolean>;
export declare function initDatabase(): Promise<void>;
export { prisma };
//# sourceMappingURL=database.d.ts.map