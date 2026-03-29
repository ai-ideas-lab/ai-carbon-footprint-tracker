import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
declare const logger: winston.Logger;
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
export { logger };
//# sourceMappingURL=requestLogger.d.ts.map