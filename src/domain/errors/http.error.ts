import { httpStatus } from '../../application/constants';

export class HttpError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }

    public toJSON() {
        return {
            message: this.message,
            status: this.status
        };
    }

    public static badRequest(message: string): HttpError {
        return new HttpError(message, httpStatus.BAD_REQUEST);
    }

    public static notFound(message?: string): HttpError {
        return new HttpError(message || 'Lo sentimos, pero no encontramos la página solicitada.', httpStatus.NOT_FOUND);
    }

    public static internalServerError(message?: string): HttpError {
        return new HttpError(message || 'Ocurrio un error inesperado. Intente de nuevo más tarde.', httpStatus.INTERNAL_SERVER_ERROR);
    }
}