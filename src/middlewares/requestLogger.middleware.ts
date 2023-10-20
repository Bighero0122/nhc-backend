import { NextFunction, Request, Response } from "express";

import { Logger } from "utils";

export const requestLoggerMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if(req.path !== '/health') {
        Logger.group('--------------- New Request ----------------');
        Logger.log('Path:', req.path);
        Logger.log('Query:', req.query);
        Logger.log('Params:', req.params);
        Logger.log('Body:', req.body);
        Logger.groupEnd();
    }

    next();
};