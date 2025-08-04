import { NextFunction, Request, Response } from 'express';

/* Utils */
import { JsonResponseUtil } from '../../../server/utils';

/**
 * Middleware function to check authentication.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void}
 */
export const authCheck = (req: Request, res: Response, next: NextFunction): void => {
    const auth = req.headers.authorization;

    if (!auth) {
        JsonResponseUtil.notFound(res);
        return;
    }

    const token = auth.split(' ')[1];

    if (!token) {
        JsonResponseUtil.notFound(res);
        return;
    }

    const envToken = process.env.ACCESS_TOKEN;

    if (!envToken || envToken !== token) {
        JsonResponseUtil.notFound(res);
        return;
    }

    next();
}