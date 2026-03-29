"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonController = void 0;
const database_1 = require("../utils/database");
const carbonFactors_1 = require("../utils/carbonFactors");
const errorHandler_1 = require("../middleware/errorHandler");
class CarbonController {
    // Create a new carbon record
    static async createRecord(req, res) {
        try {
            const { category, type, amount, unit, source, description, location } = req.body;
            // Calculate carbon emission
            const factor = (0, carbonFactors_1.getCarbonFactor)(category.toLowerCase(), source?.toLowerCase() || '');
            let carbonEmission = 0;
            if (factor) {
                carbonEmission = amount * factor;
            }
            else {
                // If no factor available, estimate based on category
                const categoryFactors = (0, carbonFactors_1.getAllCarbonFactors)()[category.toLowerCase()];
                if (categoryFactors && Object.keys(categoryFactors).length > 0) {
                    const defaultFactor = Object.values(categoryFactors)[0].factor;
                    carbonEmission = amount * defaultFactor;
                }
            }
            // Create the record
            const record = await database_1.prisma.carbonRecord.create({
                data: {
                    userId: req.user.id,
                    category,
                    type,
                    amount,
                    unit,
                    source: source || null,
                    description: description || null,
                    carbonEmission,
                    location: location || null
                }
            });
            res.status(201).json({
                success: true,
                data: record
            });
        }
        catch (error) {
            console.error('Error creating carbon record:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to create carbon record' }
            });
        }
    }
    // Get user's carbon records
    static async getUserRecords(req, res) {
        try {
            const { page = 1, limit = 10, startDate, endDate, category } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            const where = {
                userId: req.user.id
            };
            if (startDate) {
                where.date = { gte: new Date(startDate) };
            }
            if (endDate) {
                where.date = { ...where.date, lte: new Date(endDate) };
            }
            if (category) {
                where.category = category;
            }
            const records = await database_1.prisma.carbonRecord.findMany({
                where,
                orderBy: { date: 'desc' },
                skip,
                take: Number(limit)
            });
            const total = await database_1.prisma.carbonRecord.count({ where });
            res.json({
                success: true,
                data: {
                    records,
                    pagination: {
                        page: Number(page),
                        limit: Number(limit),
                        total,
                        pages: Math.ceil(total / Number(limit))
                    }
                }
            });
        }
        catch (error) {
            console.error('Error getting carbon records:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to get carbon records' }
            });
        }
    }
    // Get carbon summary
    static async getCarbonSummary(req, res) {
        try {
            const { period = 'month' } = req.query;
            let startDate;
            const now = new Date();
            switch (period) {
                case 'day':
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'year':
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
                default:
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            }
            const records = await database_1.prisma.carbonRecord.findMany({
                where: {
                    userId: req.user.id,
                    date: { gte: startDate }
                }
            });
            const summary = {
                totalEmission: records.reduce((sum, record) => sum + record.carbonEmission, 0),
                recordsCount: records.length,
                averageDailyEmission: records.length > 0
                    ? records.reduce((sum, record) => sum + record.carbonEmission, 0) / records.length
                    : 0,
                byCategory: {},
                byType: {},
                trend: []
            };
            // Group by category
            records.forEach((record) => {
                if (!summary.byCategory[record.category]) {
                    summary.byCategory[record.category] = 0;
                }
                summary.byCategory[record.category] += record.carbonEmission;
            });
            // Group by type
            records.forEach((record) => {
                if (!summary.byType[record.type]) {
                    summary.byType[record.type] = 0;
                }
                summary.byType[record.type] += record.carbonEmission;
            });
            // Calculate trend (last 7 days)
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                const dayRecords = records.filter(record => record.date >= dayStart && record.date < dayEnd);
                summary.trend.push({
                    date: dayStart.toISOString().split('T')[0],
                    emission: dayRecords.reduce((sum, record) => sum + record.carbonEmission, 0)
                });
            }
            res.json({
                success: true,
                data: summary
            });
        }
        catch (error) {
            console.error('Error getting carbon summary:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to get carbon summary' }
            });
        }
    }
    // Update a carbon record
    static async updateRecord(req, res) {
        try {
            const { id } = req.params;
            const { amount, unit, description, analyzed } = req.body;
            const existingRecord = await database_1.prisma.carbonRecord.findFirst({
                where: {
                    id,
                    userId: req.user.id
                }
            });
            if (!existingRecord) {
                throw (0, errorHandler_1.createError)('Record not found', 404);
            }
            // Recalculate emission if amount changed
            let carbonEmission = existingRecord.carbonEmission;
            if (amount !== undefined) {
                const factor = (0, carbonFactors_1.getCarbonFactor)(existingRecord.category.toLowerCase(), existingRecord.source?.toLowerCase() || '');
                if (factor) {
                    carbonEmission = amount * factor;
                }
            }
            const updatedRecord = await database_1.prisma.carbonRecord.update({
                where: { id },
                data: {
                    ...(amount !== undefined && { amount }),
                    ...(unit !== undefined && { unit }),
                    ...(description !== undefined && { description }),
                    ...(analyzed !== undefined && { analyzed }),
                    ...(amount !== undefined && { carbonEmission })
                }
            });
            res.json({
                success: true,
                data: updatedRecord
            });
        }
        catch (error) {
            console.error('Error updating carbon record:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to update carbon record' }
            });
        }
    }
    // Delete a carbon record
    static async deleteRecord(req, res) {
        try {
            const { id } = req.params;
            const existingRecord = await database_1.prisma.carbonRecord.findFirst({
                where: {
                    id,
                    userId: req.user.id
                }
            });
            if (!existingRecord) {
                throw (0, errorHandler_1.createError)('Record not found', 404);
            }
            await database_1.prisma.carbonRecord.delete({
                where: { id }
            });
            res.json({
                success: true,
                message: 'Record deleted successfully'
            });
        }
        catch (error) {
            console.error('Error deleting carbon record:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to delete carbon record' }
            });
        }
    }
}
exports.CarbonController = CarbonController;
//# sourceMappingURL=carbonController.js.map