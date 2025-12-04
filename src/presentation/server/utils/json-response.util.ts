import { Response } from 'express';

/* Constants */
import { httpStatus } from '@application/constants';

/* Contracts */
import { HttpError, HttpErrorJson } from '@domain/errors';

export interface JsonResponseData {
    message?: string;
    [key: string]: any;
}

export class JsonResponseUtil {
    private defaultDataError: HttpErrorJson;

    public constructor () {
        this.defaultDataError = HttpError.internalServerError().toJSON();
    }

    /**
     * Sends a success response.
     *
     * @param {Response} res - The response object.
     * @param {JsonResponseData} data - The response data.
     * @return {void} This function does not return a value.
     */
    public success(res: Response, data: JsonResponseData): void {
        data = Object.assign(data, { status: httpStatus.OK });
        res = Object.assign(res, { response: data });

        res.status(httpStatus.OK).json(data);
    }

    /**
     * Sends an error response.
     *
     * @param {Response} res - The response object.
     * @param {unknown} error - The error object.
     * @return {void} This function does not return a value.
     */
    public error(res: Response, error: unknown): void {
        let errorData: JsonResponseData = this.defaultDataError;
        let errorDataToLog: JsonResponseData = this.defaultDataError;
        console.log({ errorData, errorDataToLog });

        if (error instanceof HttpError) {
            errorData = error.toJSON();
            errorDataToLog = error.toJSON();
        }

        res = Object.assign(res, { response: errorDataToLog });
        res.status(errorData.status).json(errorData);
    }

    /**
     * Sends a bad request response.
     *
     * @param {Response} res - The response object.
     * @param {string} message - The error message.
     * @return {void} This function does not return a value.
     */
    public badRequest(res: Response, message: string): void {
        const badRequestError = HttpError.badRequest(message);
        this.error(res, badRequestError);
    }

    /**
     * Sends a not found response.
     *
     * @param {Response} res - The response object.
     * @return {void} This function does not return a value.
     */
    public notFound(res: Response): void {
        const notFoundError = HttpError.notFound();
        this.error(res, notFoundError);
    }

    /**
     * Sends an internal server error response.
     *
     * @param {Response} res - The response object.
     * @return {void} This function does not return a value.
     */
    public internalServerError(res: Response): void {
        const internalServerError = HttpError.internalServerError();
        this.error(res, internalServerError);
    }
}