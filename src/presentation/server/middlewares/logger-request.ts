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
    let userAgent = req.useragent?.source;

    if (req.useragent?.browser !== 'unknown') userAgent = req.useragent?.browser;
    if (req.useragent?.browser && req.useragent?.version) userAgent += ` Version ${ req.useragent?.version }`;
    if (req.useragent?.browser && req.useragent?.os !== 'unknown') userAgent += ` OS ${ req.useragent?.os }`;
    if (req.useragent?.browser && req.useragent?.platform !== 'unknown') userAgent += ` Platform ${ req.useragent?.platform }`;

    loggerAdapter.info(`${ req.method } ${ req.path } IP ${ req.ip } Agent ${ userAgent }`);

    next();
}