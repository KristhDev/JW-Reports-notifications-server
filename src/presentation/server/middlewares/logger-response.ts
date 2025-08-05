import { Request, Response, NextFunction } from 'express';

/* Dependencies */
import { loggerAdapter, userAgentAdapter } from '@config/di';

/**
 * Logs the response of an API request.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} - The function does not return anything.
 */
export const loggerResponse = (req: Request, res: Response, next: NextFunction): void => {
    let userAgent = req.headers['user-agent'];
    const parsedUserAgent = userAgentAdapter.parse(userAgent!);

    if (parsedUserAgent.browser) userAgent = parsedUserAgent.browser;
    if (parsedUserAgent.os) userAgent += ` OS ${ parsedUserAgent.os }`;
    if (parsedUserAgent.device) userAgent += ` Device ${ parsedUserAgent.device }`;
    if (!parsedUserAgent.browser && !parsedUserAgent.device && !parsedUserAgent.os) userAgent = parsedUserAgent.userAgent;

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