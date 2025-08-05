import { Request, Response, NextFunction } from 'express';

import { loggerAdapter } from '@config/di';

/**
 * Logs the response of an API request.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} - The function does not return anything.
 */
export const loggerResponse = (req: Request, res: Response, next: NextFunction): void => {
    let userAgent = req.useragent?.source;

    if (req.useragent?.browser !== 'unknown') userAgent = req.useragent?.browser;
    if (req.useragent?.browser && req.useragent?.version) userAgent += ` Version ${ req.useragent?.version }`;
    if (req.useragent?.browser && req.useragent?.os !== 'unknown') userAgent += ` OS ${ req.useragent?.os }`;
    if (req.useragent?.browser && req.useragent?.platform !== 'unknown') userAgent += ` Platform ${ req.useragent?.platform }`;

    const originalSend = res.send;

    res.send = function (body) {
        let { status, message } = JSON.parse(body);
        message = `${ req.method } ${ req.originalUrl } IP ${ req.ip } Agent ${ userAgent } Status ${ status } ${ message }`;
        res = Object.assign(res, { bodyContent: { status, message } });

        return originalSend.call(this, body);
    }

    res.on('finish', () => {
        const content = (res as any).bodyContent;

        if (content.status >= 200 && content.status < 300) loggerAdapter.success(content.message);
        else loggerAdapter.error(content.message);
    });

    next();
}