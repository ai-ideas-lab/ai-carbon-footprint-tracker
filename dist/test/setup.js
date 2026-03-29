"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.setupTestDatabase = setupTestDatabase;
exports.cleanupTestDatabase = cleanupTestDatabase;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
// Test database setup
async function setupTestDatabase() {
    // Clean the database before each test
    await cleanupTestDatabase();
}
async function cleanupTestDatabase() {
    try {
        // Delete all records in the correct order to respect foreign key constraints
        await prisma.userChallenge.deleteMany();
        await prisma.achievement.deleteMany();
        await prisma.carbonRecord.deleteMany();
        await prisma.userPreference.deleteMany();
        await prisma.groupChallenge.deleteMany();
        await prisma.socialGroup.deleteMany();
        await prisma.user.deleteMany();
    }
    catch (error) {
        console.error('Error cleaning up test database:', error);
    }
}
//# sourceMappingURL=setup.js.map