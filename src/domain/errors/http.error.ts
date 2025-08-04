import { httpStatus } from '@application/constants';

import { BaseError } from './base.error';

export interface HttpErrorJson {
    message: string;
    status: number;
}

export class HttpError extends BaseError<HttpErrorJson> {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }

    public toJSON(): HttpErrorJson {
        return {
            message: this.message,
            status: this.status,
        };
    }

    public toString(): string {
        return `${ this.name } Status ${ this.status } Message ${ this.message }`;
    }

    /**
     * Returns an HttpError with a status code of 400 (Bad Request).
     *
     * @param {string} message The error message.
     * @return {HttpError} An instance of HttpError with a status code of 400.
     */
    public static badRequest(message: string): HttpError {
        return new HttpError(message, httpStatus.BAD_REQUEST);
    }

    /**
     * Returns an HttpError with a status code of 404 (Not Found).
     *
     * @param {string} [message] The error message. If not provided, a default message is used.
     * @return {HttpError} An instance of HttpError with a status code of 404.
     */
    public static notFound(message?: string): HttpError {
        return new HttpError(message || "Sorry, but we couldn't find the requested route.", httpStatus.NOT_FOUND);
    }

    /**
     * Returns an HttpError with a status code of 500 (Internal Server Error).
     *
     * @param {string} [message] The error message. If not provided, a default message is used.
     * @return {HttpError} An instance of HttpError with a status code of 500.
     */
    public static internalServerError(message?: string): HttpError {
        return new HttpError(message || 'An unexpected error occurred. Please try again later.', httpStatus.INTERNAL_SERVER_ERROR);
    }
}