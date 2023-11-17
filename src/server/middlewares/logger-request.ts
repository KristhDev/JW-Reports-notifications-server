import { Request, Response, NextFunction } from 'express';

/* Console */
import { Logger } from '../console';

/* Interfaces */
import { JsonResponse } from '../interfaces';

/* Utils */
import { Http } from '../utils';

/**
 * Middleware function that logs incoming requests.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next function to execute.
 * @return {Promise<void>} - The function does not return anything.
 */
export const loggerRequest = async (req: Request, res: Response, next: NextFunction): Promise<JsonResponse | void> => {
    try {
        const userAgent = (req.useragent?.browser !== 'unknown') 
            ? `${ req.useragent?.browser } ${ req.useragent?.version } ${ req.useragent?.os } ${ req.useragent?.platform }` 
            : req.useragent?.source;

        await Logger.info(`${ req.method } ${ req.path } IP ${ req.ip } ${ userAgent }`);

        next();
    } 
    catch (error) {
        const userAgent = (req.useragent?.browser !== 'unknown') 
            ? `${ req.useragent?.browser } ${ req.useragent?.version } ${ req.useragent?.os } ${ req.useragent?.platform }` 
            : req.useragent?.source;

        await Logger.error(`${ req.method } ${ req.path } IP ${ req.ip } ${ userAgent } ${ (error as any).message }`);

        return Http.internalServerError(res);
    }
}