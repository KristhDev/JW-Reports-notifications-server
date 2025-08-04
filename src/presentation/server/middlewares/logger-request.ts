import { Request, Response, NextFunction } from 'express';

import { loggerAdapter } from '@config/di';

/**
 * Middleware function that logs incoming requests.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next function to execute.
 * @returns {void} - The function does not return anything.
 */
export const loggerRequest = (req: Request, res: Response, next: NextFunction): void => {
    const userAgent = (req.useragent?.browser !== 'unknown') 
        ? `${ req.useragent?.browser } ${ req.useragent?.version } ${ req.useragent?.os } ${ req.useragent?.platform }` 
        : req.useragent?.source;

    loggerAdapter.info(`${ req.method } ${ req.path } IP ${ req.ip } ${ userAgent }`);

    next();
}