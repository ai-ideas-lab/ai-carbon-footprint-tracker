import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class AIController {
    private static openai;
    constructor();
    static analyzeRecord(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static generateReductionPlan(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=aiController.d.ts.map