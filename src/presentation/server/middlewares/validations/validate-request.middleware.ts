import { Request, NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

/* Middleware */
import { BaseMiddleware } from '../base.middleware';

export class ValidateRequestMiddleware extends BaseMiddleware {
    public constructor() {
        super();
    }

    /**
     * Validates a request and sends an error response if the request is invalid.
     *
     * @param {Request} req - the request object to validate
     * @param {Response} res - the response object to send if the request is invalid
     * @param {NextFunction} next - the next middleware function to call if the request is valid
     * @return {void} - a response object if the request is invalid, otherwise void
     */
    public handle(req: Request, res: Response, next: NextFunction): void {
        const error = validationResult(req).formatWith(error => error.msg)

        const hasError = !error.isEmpty();
        if (hasError) return this.jsonResponse.badRequest(res, error.array()[0]);

        next();
    }
}