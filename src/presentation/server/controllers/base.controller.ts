import { Request, Response } from 'express';

/* Constants */
import { httpStatus } from '@application/constants';

/* Utils */
import { JsonResponseUtil } from '@server/utils';

export abstract class BaseController {
    protected readonly jsonResponse: JsonResponseUtil;
    protected readonly httpStatus = httpStatus;

    public constructor (
    ) {
        this.jsonResponse = new JsonResponseUtil();
    }

    public abstract handle(req: Request, res: Response): void;
}