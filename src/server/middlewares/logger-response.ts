import { Request, Response, NextFunction } from 'express';

/* Console */
import { Logger } from '../console';

/**
 * Logs the response of an API request.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} - The function does not return anything.
 */
export const loggerResponse = (req: Request, res: Response, next: NextFunction): void => {
    const userAgent = (req.useragent?.browser !== 'unknown') 
        ? `${ req.useragent?.browser } ${ req.useragent?.version } ${ req.useragent?.os } ${ req.useragent?.platform }` 
        : req.useragent?.source;

    const originalSend = res.send;

    res.send = function (body) {
        const { status, msg } = JSON.parse(body);
        const message = `${ req.method } ${ req.originalUrl } IP ${ req.ip } ${ userAgent } Status ${ status } ${ msg }`;

        if (status >= 200 && status < 300) Logger.success(message).then(() => originalSend.call(this, body));
        else Logger.error(message).then(() => originalSend.call(this, body));

        return originalSend.call(this, body);
    }

    next();
}