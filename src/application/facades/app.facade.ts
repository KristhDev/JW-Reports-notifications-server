import { LoggerAdapterContract, TimeAdapterContract } from '../../domain/contracts/adapters';
import { UsersDatasourceContract } from '../../domain/contracts/datasources';
import { AppFacadeContract } from '../../domain/contracts/facades';
import { NotificationsServiceContract } from '../../domain/contracts/services';

import { AppNewVersionDto } from '../../domain/dtos/app';

export class AppFacade implements AppFacadeContract {
    constructor (
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly usersDatasource: UsersDatasourceContract,
        private readonly notificationsService: NotificationsServiceContract
    ) {}

    public async notifyNewVersion(appNewVersionDto: AppNewVersionDto): Promise<void> {
        try {
            const usersIds = await this.usersDatasource.getAllUsersIds();

            await this.notificationsService.sendNewAppVersionNotification({
                usersIds,
                version: appNewVersionDto.version,
                launchUrl: appNewVersionDto.launchUrl
            });

            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            this.loggerAdapter.info(`${ hour } New version notification sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}