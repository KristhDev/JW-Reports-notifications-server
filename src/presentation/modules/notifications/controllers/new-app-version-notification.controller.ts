import { Request, Response } from 'express';

import { AppNewVersionDto } from '@domain/dtos/app';

import { NotifyUsersWithNewAppVersionUsecaseContract } from '@domain/contracts/usecases/app';

import { JsonResponseUtil } from '@server/utils';

export class NewAppVersionNotificationController {
    constructor(
        private readonly notifyUsersWithNewAppVersionUsecase: NotifyUsersWithNewAppVersionUsecaseContract,
    ) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const dto = AppNewVersionDto.fromRequest(req.body);
            await this.notifyUsersWithNewAppVersionUsecase.execute(dto);

            JsonResponseUtil.success(res, 'New app version notification sent successfully');
        } 
        catch (error) {
            JsonResponseUtil.internalServerError(res);
        }
    }
}