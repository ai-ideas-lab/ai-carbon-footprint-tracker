"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.testConnection = testConnection;
exports.initDatabase = initDatabase;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});
exports.prisma = prisma;
// Test database connection
async function testConnection() {
    try {
        await prisma.$connect();
        console.log('✅ Database connection established');
        return true;
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
}
// Initialize database with basic data
async function initDatabase() {
    try {
        // Test connection first
        const isConnected = await testConnection();
        if (!isConnected) {
            throw new Error('Database connection failed');
        }
        // Check if admin user exists, create if not
        const adminUser = await prisma.user.findFirst({
            where: { email: 'admin@carbontracker.com' }
        });
        if (!adminUser) {
            await prisma.user.create({
                data: {
                    email: 'admin@carbontracker.com',
                    password: 'hashed_password_placeholder',
                    name: '系统管理员',
                    emailVerified: true
                }
            });
            console.log('✅ Admin user created');
        }
        console.log('✅ Database initialized successfully');
    }
    catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}
//# sourceMappingURL=database.js.map