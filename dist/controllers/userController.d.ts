import { Request, Response } from 'express';
declare module 'jsonwebtoken' {
    function sign(payload: any, secretOrPrivateKey: string, options?: any): string;
}
import { AuthRequest } from '../middleware/auth';
export declare class UserController {
    static register(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static getProfile(req: AuthRequest, res: Response): Promise<void>;
    static updateProfile(req: AuthRequest, res: Response): Promise<void>;
    static changePassword(req: AuthRequest, res: Response): Promise<void>;
    static deleteAccount(req: AuthRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=userController.d.ts.map