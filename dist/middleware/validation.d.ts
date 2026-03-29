import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
export declare const validate: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const userValidationSchemas: {
    register: Joi.ObjectSchema<any>;
    login: Joi.ObjectSchema<any>;
    updateProfile: Joi.ObjectSchema<any>;
};
export declare const carbonValidationSchemas: {
    createRecord: Joi.ObjectSchema<any>;
    updateRecord: Joi.ObjectSchema<any>;
};
export declare const aiValidationSchemas: {
    analyzeRecord: Joi.ObjectSchema<any>;
};
//# sourceMappingURL=validation.d.ts.map