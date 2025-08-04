import { Request, Response } from 'express';

/* Contracts */
import { NotifyUsersOfPendingLessonsUsecaseContract } from '@domain/contracts/usecases/courses';
import { NotifyUsersOfPendingRevisitsUsecaseContract } from '@domain/contracts/usecases/revisits';
import { NotifyUsersToSendReportUsecaseContract } from '@domain/contracts/usecases/preaching';

/* Utils */
import { JsonResponseUtil } from '@server/utils';

export class DailyNotificationsController {
    constructor(
        private readonly notifyUsersToSendReportUsecase: NotifyUsersToSendReportUsecaseContract,
        private readonly notifyUsersOfPendingRevisitsUsecase: NotifyUsersOfPendingRevisitsUsecaseContract,
        private readonly notifyUsersOfPendingLessonsUsecase: NotifyUsersOfPendingLessonsUsecaseContract,
    ) {}

    /**
     * Send all daily notifications.
     *
     * @param {Request} req The express request object
     * @param {Response} res The express response object
     * @return {Promise<void>} The promise that resolves when the notifications
     * are sent
     */
    public async handle(req: Request, res: Response): Promise<void> {
        try {
            await this.notifyUsersToSendReportUsecase.execute();
            await this.notifyUsersOfPendingRevisitsUsecase.execute();
            await this.notifyUsersOfPendingLessonsUsecase.execute();

            JsonResponseUtil.success(res, 'Notifications sent successfully');
        } 
        catch (error) {
            JsonResponseUtil.internalServerError(res);
        }
    }
}