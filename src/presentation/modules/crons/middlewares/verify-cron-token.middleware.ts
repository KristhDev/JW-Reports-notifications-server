import { Request, NextFunction, Response } from 'express';

/* Config */
import { env } from '@config/env';

/* Middleware */
import { BaseMiddleware } from '@server/middlewares';

export class VerifyCronToken extends BaseMiddleware {
    public constructor() {
        super();
    }

    /**
     * Validates the cron token in the request headers.
     *
     * @param {Request} req - the request object to validate
     * @param {Response} res - the response object to send if the request is invalid
     * @param {NextFunction} next - the next middleware function to call if the request is valid
     * @return {void} - a response object if the request is invalid, otherwise void
     */
    public handle(req: Request, res: Response, next: NextFunction): void {
        const tokenHeader = req.headers['x-cron-token']?.toString() || '';
        if (!tokenHeader) return this.jsonResponse.notFound(res);

        const isValidToken = tokenHeader === env.APP_CRON_TOKEN;
        if (!isValidToken) return this.jsonResponse.notFound(res);

        next();
    }
}