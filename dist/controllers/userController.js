"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../utils/database");
const errorHandler_1 = require("../middleware/errorHandler");
class UserController {
    // User registration
    static async register(req, res) {
        try {
            const { email, password, name } = req.body;
            // Check if user already exists
            const existingUser = await database_1.prisma.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                throw (0, errorHandler_1.createError)('User already exists with this email', 409);
            }
            // Hash password
            const saltRounds = 12;
            const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
            // Create user
            const user = await database_1.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    createdAt: true
                }
            });
            // Create user preferences
            await database_1.prisma.userPreference.create({
                data: {
                    userId: user.id,
                    preferredCategories: '[]', // JSON string for SQLite
                    notificationsEnabled: true,
                    language: 'zh-CN',
                    currency: 'CNY'
                }
            });
            // Generate token
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
            res.status(201).json({
                success: true,
                data: {
                    user,
                    token
                }
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            if (error instanceof Error && error.message.includes('already exists')) {
                res.status(409).json({
                    success: false,
                    error: { message: error.message }
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    error: { message: 'Failed to register user' }
                });
            }
        }
    }
    // User login
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            // Find user
            const user = await database_1.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                throw (0, errorHandler_1.createError)('Invalid credentials', 401);
            }
            // Check password
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw (0, errorHandler_1.createError)('Invalid credentials', 401);
            }
            // Generate token
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                name: user.name
            }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
            // Get user preferences
            const preferences = await database_1.prisma.userPreference.findFirst({
                where: { userId: user.id }
            });
            res.json({
                success: true,
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar,
                        createdAt: user.createdAt
                    },
                    preferences,
                    token
                }
            });
        }
        catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error && error.message.includes('Invalid credentials')) {
                res.status(401).json({
                    success: false,
                    error: { message: error.message }
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    error: { message: 'Failed to login user' }
                });
            }
        }
    }
    // Get current user profile
    static async getProfile(req, res) {
        try {
            const user = await database_1.prisma.user.findUnique({
                where: { id: req.user.id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            const preferences = await database_1.prisma.userPreference.findFirst({
                where: { userId: req.user.id }
            });
            res.json({
                success: true,
                data: {
                    user,
                    preferences
                }
            });
        }
        catch (error) {
            console.error('Error getting profile:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to get profile' }
            });
        }
    }
    // Update user profile
    static async updateProfile(req, res) {
        try {
            const { name, avatar, preferences } = req.body;
            const updateData = {};
            if (name)
                updateData.name = name;
            if (avatar)
                updateData.avatar = avatar;
            // Update user
            const user = await database_1.prisma.user.update({
                where: { id: req.user.id },
                data: updateData,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatar: true,
                    updatedAt: true
                }
            });
            // Update preferences if provided
            if (preferences) {
                const existingPreference = await database_1.prisma.userPreference.findFirst({
                    where: { userId: req.user.id }
                });
                if (existingPreference) {
                    await database_1.prisma.userPreference.update({
                        where: { id: existingPreference.id },
                        data: {
                            ...preferences,
                            preferredCategories: preferences.preferredCategories ? JSON.stringify(preferences.preferredCategories) : existingPreference.preferredCategories
                        }
                    });
                }
                else {
                    await database_1.prisma.userPreference.create({
                        data: {
                            userId: req.user.id,
                            ...preferences,
                            preferredCategories: preferences.preferredCategories ? JSON.stringify(preferences.preferredCategories) : '[]'
                        }
                    });
                }
            }
            // Get updated preferences
            const updatedPreferences = await database_1.prisma.userPreference.findFirst({
                where: { userId: req.user.id }
            });
            res.json({
                success: true,
                data: {
                    user,
                    preferences: updatedPreferences
                }
            });
        }
        catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to update profile' }
            });
        }
    }
    // Change password
    static async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            // Get user with password
            const user = await database_1.prisma.user.findUnique({
                where: { id: req.user.id }
            });
            if (!user) {
                throw (0, errorHandler_1.createError)('User not found', 404);
            }
            // Verify current password
            const isCurrentPasswordValid = await bcryptjs_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw (0, errorHandler_1.createError)('Current password is incorrect', 400);
            }
            // Hash new password
            const saltRounds = 12;
            const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, saltRounds);
            // Update password
            await database_1.prisma.user.update({
                where: { id: req.user.id },
                data: { password: hashedNewPassword }
            });
            res.json({
                success: true,
                message: 'Password updated successfully'
            });
        }
        catch (error) {
            console.error('Error changing password:', error);
            if (error instanceof Error && error.message.includes('Current password')) {
                res.status(400).json({
                    success: false,
                    error: { message: error.message }
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    error: { message: 'Failed to change password' }
                });
            }
        }
    }
    // Delete user account
    static async deleteAccount(req, res) {
        try {
            // Delete all related data
            await database_1.prisma.carbonRecord.deleteMany({
                where: { userId: req.user.id }
            });
            await database_1.prisma.achievement.deleteMany({
                where: { userId: req.user.id }
            });
            await database_1.prisma.userChallenge.deleteMany({
                where: { userId: req.user.id }
            });
            await database_1.prisma.userPreference.deleteMany({
                where: { userId: req.user.id }
            });
            // Delete user
            await database_1.prisma.user.delete({
                where: { id: req.user.id }
            });
            res.json({
                success: true,
                message: 'Account deleted successfully'
            });
        }
        catch (error) {
            console.error('Error deleting account:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to delete account' }
            });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map