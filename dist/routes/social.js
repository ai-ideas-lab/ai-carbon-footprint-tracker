"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialRoutes = void 0;
const express_1 = require("express");
const socialController_1 = require("../controllers/socialController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.socialRoutes = router;
// All social routes require authentication
router.use(auth_1.authenticate);
// Group management
router.post('/groups', socialController_1.SocialController.createGroup);
router.get('/groups', socialController_1.SocialController.getUserGroups);
router.post('/groups/:groupId/join', socialController_1.SocialController.joinGroup);
router.post('/groups/:groupId/leave', socialController_1.SocialController.leaveGroup);
// Challenge management
router.post('/challenges', socialController_1.SocialController.createChallenge);
router.get('/groups/:groupId/challenges', socialController_1.SocialController.getGroupChallenges);
router.put('/challenges/:challengeId/progress', socialController_1.SocialController.updateChallengeProgress);
// Social features
router.get('/groups/:groupId/leaderboard', socialController_1.SocialController.getLeaderboard);
router.get('/stats', socialController_1.SocialController.getUserSocialStats);
//# sourceMappingURL=social.js.map