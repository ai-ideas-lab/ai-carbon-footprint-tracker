"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiValidationSchemas = exports.carbonValidationSchemas = exports.userValidationSchemas = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Validation failed',
                    details: error.details.map(detail => ({
                        field: detail.path.join('.'),
                        message: detail.message
                    }))
                }
            });
        }
        next();
    };
};
exports.validate = validate;
// Common validation schemas
exports.userValidationSchemas = {
    register: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
        name: joi_1.default.string().min(2).max(50).required()
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    }),
    updateProfile: joi_1.default.object({
        name: joi_1.default.string().min(2).max(50),
        avatar: joi_1.default.string().uri(),
        preferences: joi_1.default.object({
            notificationsEnabled: joi_1.default.boolean(),
            dailyGoal: joi_1.default.number().positive(),
            language: joi_1.default.string(),
            currency: joi_1.default.string()
        })
    })
};
exports.carbonValidationSchemas = {
    createRecord: joi_1.default.object({
        category: joi_1.default.string().valid('TRANSPORTATION', 'FOOD', 'ENERGY', 'SHOPPING', 'HOUSING', 'WASTE', 'OTHER').required(),
        type: joi_1.default.string().valid('DIRECT', 'INDIRECT', 'OFFSET').required(),
        amount: joi_1.default.number().positive().required(),
        unit: joi_1.default.string().required(),
        source: joi_1.default.string().allow(''),
        description: joi_1.default.string().allow(''),
        location: joi_1.default.string().allow('')
    }),
    updateRecord: joi_1.default.object({
        amount: joi_1.default.number().positive(),
        unit: joi_1.default.string(),
        description: joi_1.default.string(),
        analyzed: joi_1.default.boolean()
    })
};
exports.aiValidationSchemas = {
    analyzeRecord: joi_1.default.object({
        recordData: joi_1.default.object({
            id: joi_1.default.string().required(),
            category: joi_1.default.string().required(),
            type: joi_1.default.string().required(),
            amount: joi_1.default.number().positive().required(),
            unit: joi_1.default.string().required(),
            description: joi_1.default.string().allow('')
        }).required(),
        context: joi_1.default.string().allow('')
    })
};
//# sourceMappingURL=validation.js.map