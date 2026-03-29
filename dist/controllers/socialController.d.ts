import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class SocialController {
    static createGroup(req: AuthRequest, res: Response): Promise<void>;
    static getUserGroups(req: AuthRequest, res: Response): Promise<void>;
    static joinGroup(req: AuthRequest, res: Response): Promise<void>;
    static leaveGroup(req: AuthRequest, res: Response): Promise<void>;
    static createChallenge(req: AuthRequest, res: Response): Promise<void>;
    static getGroupChallenges(req: AuthRequest, res: Response): Promise<void>;
    static updateChallengeProgress(req: AuthRequest, res: Response): Promise<void>;
    static getLeaderboard(req: AuthRequest, res: Response): Promise<void>;
    static getUserSocialStats(req: AuthRequest, res: Response): Promise<void>;
    private static calculateCarbonImpact;
}
//# sourceMappingURL=socialController.d.ts.map