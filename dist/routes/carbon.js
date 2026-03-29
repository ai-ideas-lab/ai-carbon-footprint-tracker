"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carbonRoutes = void 0;
const express_1 = require("express");
const carbonController_1 = require("../controllers/carbonController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
exports.carbonRoutes = router;
// All routes require authentication
router.use(auth_1.authenticate);
// Carbon record management
router.post('/records', (0, validation_1.validate)(validation_1.carbonValidationSchemas.createRecord), carbonController_1.CarbonController.createRecord);
router.get('/records', carbonController_1.CarbonController.getUserRecords);
router.get('/summary', carbonController_1.CarbonController.getCarbonSummary);
router.put('/records/:id', (0, validation_1.validate)(validation_1.carbonValidationSchemas.updateRecord), carbonController_1.CarbonController.updateRecord);
router.delete('/records/:id', carbonController_1.CarbonController.deleteRecord);
//# sourceMappingURL=carbon.js.map