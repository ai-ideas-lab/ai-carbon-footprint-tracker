import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class CarbonController {
    static createRecord(req: AuthRequest, res: Response): Promise<void>;
    static getUserRecords(req: AuthRequest, res: Response): Promise<void>;
    static getCarbonSummary(req: AuthRequest, res: Response): Promise<void>;
    static updateRecord(req: AuthRequest, res: Response): Promise<void>;
    static deleteRecord(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=carbonController.d.ts.map