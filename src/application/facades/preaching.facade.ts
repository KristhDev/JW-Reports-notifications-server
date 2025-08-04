/* Contracts */
import { LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';
import { UsersDatasourceContract } from '@domain/contracts/datasources';
import { PreachingFacadeContract } from '@domain/contracts/facades';
import { NotificationsServiceContract } from '@domain/contracts/services';

/* Errors */
import { BaseError, DatasourceError, HttpError } from '@domain/errors';

export class PreachingFacade implements PreachingFacadeContract {
    constructor (
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly usersDatasource: UsersDatasourceContract,
        private readonly notificationsService: NotificationsServiceContract
    ) {}

    /**
     * Notify all users to send their preaching reports.
     *
     * @return {Promise<void>} The promise that resolves when the notification is sent.
     */
    public async notifyUsersToSendReports(): Promise<void> {
        try {
            const currentDay = this.timeAdapter.getCurrentDay();
            const lastDay = this.timeAdapter.getLastDayOfCurrentMonth();

            if (currentDay !== lastDay) {
                const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
                this.loggerAdapter.info(`${ hour } Reports are not due yet.`);

                return;
            }

            const usersIds = await this.usersDatasource.getAllUsersIds();
            await this.notificationsService.sendPreachingReportNotification(usersIds);

            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            this.loggerAdapter.info(`${ hour } Preaching report notification sent.`);
        } 
        catch (error) {
            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            let errorToThrow = error;

            if (error instanceof BaseError) this.loggerAdapter.error(`${ hour } ${ error.toString() }`);
            if (error instanceof DatasourceError) errorToThrow = HttpError.internalServerError();

            throw errorToThrow;
        }
    }
}