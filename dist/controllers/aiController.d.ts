import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class AIController {
    private static openai;
    constructor();
    static analyzeRecord(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static generateReductionPlan(req: AuthRequest, res: Response): Promise<void>;
    static chatAdvice(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getInsights(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=aiController.d.ts.map