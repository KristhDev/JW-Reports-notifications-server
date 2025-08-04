import { LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';
import { RevisitsDatasourceContract } from '@domain/contracts/datasources';
import { RevisitsFacadeContract } from '@domain/contracts/facades';
import { NotificationsServiceContract } from '@domain/contracts/services';

export class RevisitsFacade implements RevisitsFacadeContract {
    constructor(
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly revisitsDatasource: RevisitsDatasourceContract,
        private readonly notificationsService: NotificationsServiceContract
    ) {}

    public async notifyUsersOfPendingRevisits(): Promise<void> {
        try {
            const usersIds = await this.revisitsDatasource.getUsersIdsOfPendingRevisits();

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
            throw error;
        }
    }
}