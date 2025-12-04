import { NextFunction, Request, Response } from 'express';

/* Contracts */
import { LoggerAdapterContract } from '@domain/contracts/adapters';

/* Dtos */
import { RequestContextDto } from '@domain/dtos/logs';

/* Middlewares */
import { BaseMiddleware } from '../base.middleware';

export class LogRequestsMiddleware extends BaseMiddleware {
    public constructor(
        private readonly loggerAdapter: LoggerAdapterContract
    ) {
        super();
    }

    /**
     * Finishes the request.
     *
     * @param {RequestContextDto} requestContextDto - The request context DTO.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @return {void} This function does not return a value.
     */
    private onFinish(requestContextDto: RequestContextDto, req: Request, res: Response): void {
        const response = (res as any).response;
        const requestContext = requestContextDto.toJSON();

        const respContext = { request: requestContext, response }
        const logMessage = `${ requestContextDto.method } ${ requestContextDto.path }`;

        const statusIsOk = response.status >= this.httpStatus.OK && response.status < 300;

        if (statusIsOk) this.loggerAdapter.info(logMessage, respContext);
        else this.loggerAdapter.error(logMessage, respContext);
    }

    /**
     * Middleware to log incoming requests and their responses.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @param {NextFunction} next - The next function.
     * @return {void} This function does not return a value.
     */
    public handle(req: Request, res: Response, next: NextFunction): void {
        const requestContextDto = RequestContextDto.fromRequest(req);

        this.loggerAdapter.info(`${ requestContextDto.method } ${ requestContextDto.path }`, { request: requestContextDto.toJSON() });
        if (!req.url.startsWith('/api') || req.url.startsWith('/api/docs')) return next();

        res.on('finish', () => this.onFinish(requestContextDto, req, res));

        next();
    }
}