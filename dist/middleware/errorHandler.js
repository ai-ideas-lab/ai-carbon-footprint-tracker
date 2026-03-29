"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    console.error(`❌ Error ${statusCode}: ${message}`);
    console.error(error.stack);
    // Don't leak error details in production
    const response = {
        success: false,
        error: {
            message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong',
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        }
    };
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};
exports.createError = createError;
//# sourceMappingURL=errorHandler.js.map