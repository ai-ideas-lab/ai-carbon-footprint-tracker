"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = void 0;
const express_1 = require("express");
const aiController_1 = require("../controllers/aiController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.aiRoutes = router;
// All AI routes require authentication
router.use(auth_1.authenticate);
// AI analysis routes
router.post('/analyze', (0, validation_1.validate)(validation_1.aiValidationSchemas.analyzeRecord), aiController_1.AIController.analyzeRecord);
router.post('/reduction-plan', aiController_1.AIController.generateReductionPlan);
router.post('/chat', aiController_1.AIController.chatAdvice);
router.get('/insights', aiController_1.AIController.getInsights);
//# sourceMappingURL=ai.js.map