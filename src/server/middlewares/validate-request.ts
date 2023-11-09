import { Request, NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

/* Interfaces */
import { JsonResponse } from '../interfaces';

/* Utils */
import { Http } from '../../server';

/**
 * Validates a request and sends an error response if the request is invalid.
 *
 * @param {Request} req - the request object to validate
 * @param {JsonResponse} res - the response object to send if the request is invalid
 * @param {NextFunction} next - the next middleware function to call if the request is valid
 * @return {JsonResponse | void} - a response object if the request is invalid, otherwise void
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): JsonResponse | void => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    if (!error.isEmpty()) return Http.badRequest(error.array()[0], res);

    return next();
}