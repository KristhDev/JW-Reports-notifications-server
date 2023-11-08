import { NextFunction, Request, Response } from 'express';

/* Server */
import { Http, JsonResponse } from '../../server';

/**
 * Middleware function to check authentication.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {JsonResponse | void}
 */
export const authCheck = (req: Request, res: Response, next: NextFunction): JsonResponse | void => {
    const auth = req.headers.authorization;
    if (!auth) return Http.notFound(res);

    const token = auth.split(' ')[1];
    if (!token) return Http.notFound(res);

    const envToken = process.env.ACCESS_TOKEN;
    if (!envToken || envToken !== token) return Http.notFound(res);

    next();
}