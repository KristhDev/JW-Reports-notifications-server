import { Response } from 'express';

import { httpStatus } from '../../../application/constants';

import { HttpError } from '../../../domain/errors';

import { JsonResponse } from '../interfaces';

export class JsonResponseUtil {
    public static badRequest(error: string, res: Response): JsonResponse {
        const badRequestError = HttpError.badRequest(error);
        return res.status(httpStatus.BAD_REQUEST).json(badRequestError.toJSON());
    }

    public static notFound(res: Response): JsonResponse {
        const notFoundError = HttpError.notFound();
        return res.status(httpStatus.NOT_FOUND).json(notFoundError.toJSON());
    }

    public static success(res: Response, message: string): JsonResponse {
        return res.status(httpStatus.OK).json({
            message,
            status: httpStatus.OK
        });
    }

    public static internalServerError(res: Response): JsonResponse {
        const internalServerError = HttpError.internalServerError();
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(internalServerError.toJSON());
    }
}