import { Request, Response, NextFunction } from 'express';

/* Dependencies */
import { loggerAdapter, userAgentAdapter } from '@config/di';

/**
 * Middleware function that logs incoming requests.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next function to execute.
 * @returns {void} - The function does not return anything.
 */
export const loggerRequest = (req: Request, res: Response, next: NextFunction): void => {
    let userAgent = req.headers['user-agent'];
    const parsedUserAgent = userAgentAdapter.parse(userAgent!);

    if (parsedUserAgent.browser) userAgent = parsedUserAgent.browser;
    if (parsedUserAgent.os) userAgent += ` OS ${ parsedUserAgent.os }`;
    if (parsedUserAgent.device) userAgent += ` Device ${ parsedUserAgent.device }`;
    if (!parsedUserAgent.browser && !parsedUserAgent.device && !parsedUserAgent.os) userAgent = parsedUserAgent.userAgent;

    loggerAdapter.info(`${ req.method } ${ req.path } IP ${ req.ip } Agent ${ userAgent }`);

    next();
}