import { Request, NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

/* Utils */
import { JsonResponseUtil } from '../utils';

/**
 * Validates a request and sends an error response if the request is invalid.
 *
 * @param {Request} req - the request object to validate
 * @param {Response} res - the response object to send if the request is invalid
 * @param {NextFunction} next - the next middleware function to call if the request is valid
 * @return {void} - a response object if the request is invalid, otherwise void
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    if (!error.isEmpty()) {
        JsonResponseUtil.badRequest(error.array()[0], res);
        return;
    }

    return next();
}