"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.userRoutes = router;
// Authentication routes (no auth required)
router.post('/register', (0, validation_1.validate)(validation_1.userValidationSchemas.register), userController_1.UserController.register);
router.post('/login', (0, validation_1.validate)(validation_1.userValidationSchemas.login), userController_1.UserController.login);
// Protected routes
const auth_1 = require("../middleware/auth");
router.use(auth_1.authenticate);
router.get('/profile', userController_1.UserController.getProfile);
router.put('/profile', (0, validation_1.validate)(validation_1.userValidationSchemas.updateProfile), userController_1.UserController.updateProfile);
router.put('/change-password', userController_1.UserController.changePassword);
router.delete('/account', userController_1.UserController.deleteAccount);
//# sourceMappingURL=user.js.map