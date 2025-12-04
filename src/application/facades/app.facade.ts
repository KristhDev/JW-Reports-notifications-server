/* Contracts */
import { LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';
import { UsersDataSourceContract } from '@domain/contracts/datasources';
import { AppFacadeContract } from '@domain/contracts/facades';
import { NotificationsServiceContract } from '@domain/contracts/services';

/* Dtos */
import { AppNewVersionDto } from '@domain/dtos/app';

/* Errors */
import { BaseError, DataSourceError, HttpError } from '@domain/errors';

export class AppFacade implements AppFacadeContract {
    constructor (
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly usersDataSource: UsersDataSourceContract,
        private readonly notificationsService: NotificationsServiceContract
    ) {}

    /**
     * Send a notification to all users that a new version of the app is available.
     *
     * @param {AppNewVersionDto} appNewVersionDto - The new version of the app.
     * @return {Promise<void>} The promise that resolves when the notification is sent.
     */
    public async notifyNewVersion(appNewVersionDto: AppNewVersionDto): Promise<void> {
        try {
            const usersIds = await this.usersDataSource.getAllUsersIds();

            await this.notificationsService.sendNewAppVersionNotification({
                usersIds,
                version: appNewVersionDto.version,
                launchUrl: appNewVersionDto.launchUrl
            });

            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            this.loggerAdapter.info(`${ hour } New version notification sent.`);
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