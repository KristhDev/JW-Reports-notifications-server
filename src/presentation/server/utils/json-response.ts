import { Response } from 'express';

/* Constants */
import { httpStatus } from '@application/constants';

/* Errors */
import { HttpError } from '@domain/errors';

export class JsonResponseUtil {
    /**
     * Sends a successful JSON response with the given message and a status code of 200 (OK).
     *
     * @param {Response} res - The response object to send the response with.
     * @param {string} message - The message to include in the JSON response.
     * @return {Response} The response object that was sent.
     */
    public static success(res: Response, message: string): Response {
        return res.status(httpStatus.OK).json({
            message,
            status: httpStatus.OK
        });
    }

    /**
     * Sends a JSON response with the given error message and a status code of 400 (Bad Request).
     *
     * @param {string} error - The error message to include in the JSON response.
     * @param {Response} res - The response object to send the response with.
     * @return {Response} The response object that was sent.
     */
    public static badRequest(error: string, res: Response): Response {
        const badRequestError = HttpError.badRequest(error);

        const data = (badRequestError.toJSON !== undefined)
            ? badRequestError.toJSON()
            : { message: badRequestError.message, status: badRequestError.status };

        return res.status(httpStatus.BAD_REQUEST).json(data);
    }

    /**
     * Sends a JSON response with a default error message and a status code of 404 (Not Found).
     *
     * @param {Response} res - The response object to send the response with.
     * @return {Response} The response object that was sent.
     */
    public static notFound(res: Response): Response {
        const notFoundError = HttpError.notFound();

        const data = (notFoundError.toJSON !== undefined)
            ? notFoundError.toJSON()
            : { message: notFoundError.message, status: notFoundError.status };

        return res.status(httpStatus.NOT_FOUND).json(data);
    }

    /**
     * Sends a JSON response with a default error message and a status code of 500 (Internal Server Error).
     *
     * @param {Response} res - The response object to send the response with.
     * @return {Response} The response object that was sent.
     */
    public static internalServerError(res: Response): Response {
        const internalServerError = HttpError.internalServerError();

        const data = (internalServerError.toJSON !== undefined)
            ? internalServerError.toJSON()
            : { message: internalServerError.message, status: internalServerError.status };

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(data);
    }
}