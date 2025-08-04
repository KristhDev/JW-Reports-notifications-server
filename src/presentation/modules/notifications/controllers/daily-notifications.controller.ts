import { Request, Response } from 'express';

import { NotifyUsersOfPendingLessonsUsecaseContract } from '../../../../domain/contracts/usecases/courses';
import { NotifyUsersOfPendingRevisitsUsecaseContract } from '../../../../domain/contracts/usecases/revisits';
import { NotifyUsersToSendReportUsecaseContract } from '../../../../domain/contracts/usecases/preaching';

import { JsonResponseUtil } from '../../../server/utils';

export class DailyNotificationsController {
    constructor(
        private readonly notifyUsersToSendReportUsecase: NotifyUsersToSendReportUsecaseContract,
        private readonly notifyUsersOfPendingRevisitsUsecase: NotifyUsersOfPendingRevisitsUsecaseContract,
        private readonly notifyUsersOfPendingLessonsUsecase: NotifyUsersOfPendingLessonsUsecaseContract,
    ) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            await this.notifyUsersToSendReportUsecase.execute();
            await this.notifyUsersOfPendingRevisitsUsecase.execute();
            await this.notifyUsersOfPendingLessonsUsecase.execute();

            JsonResponseUtil.success(res, 'Notifications sent successfully');
        } 
        catch (error) {
            console.log(error);
            JsonResponseUtil.internalServerError(res);
        }
    }
}