/* Contracts */
import { LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';
import { RevisitsDataSourceContract } from '@domain/contracts/datasources';
import { RevisitsFacadeContract } from '@domain/contracts/facades';
import { NotificationsServiceContract } from '@domain/contracts/services';

/* Errors */
import { BaseError, DataSourceError, HttpError } from '@domain/errors';

export class RevisitsFacade implements RevisitsFacadeContract {
    constructor(
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly revisitsDataSource: RevisitsDataSourceContract,
        private readonly notificationsService: NotificationsServiceContract
    ) {}

    /**
     * Notify all users with pending revisits for today.
     *
     * @return {Promise<void>} The promise that resolves when the notification is sent.
     */
    public async notifyUsersOfPendingRevisits(): Promise<void> {
        try {
            const usersIds = await this.revisitsDataSource.getUsersIdsOfPendingRevisits();

            if (usersIds.length === 0) {
                const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
                this.loggerAdapter.info(`${ hour } There are no pending revisits.`);

                return;
            }

            await this.notificationsService.sendRevisitsDailyNotification(usersIds);

            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            this.loggerAdapter.info(`${ hour } Revisits notification sent.`);
        } 
        catch (error) {
            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            let errorToThrow = error;

            if (error instanceof BaseError) this.loggerAdapter.error(`${ hour } ${ error.toString() }`);
            if (error instanceof DataSourceError) errorToThrow = HttpError.internalServerError();

            throw errorToThrow;
        }
    }
}