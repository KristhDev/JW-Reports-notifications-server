/* Contracts */
import { PreachingFacadeContract } from '@domain/contracts/facades';
import { NotifyUsersToSendReportUsecaseContract } from '@domain/contracts/usecases/preaching';

export class NotifyUsersToSendReportUseCase implements NotifyUsersToSendReportUsecaseContract {
    constructor (
        private readonly preachingFacade: PreachingFacadeContract
    ) {}

    /**
     * Notify all users to send their preaching reports.
     *
     * @return {Promise<void>} The promise that resolves when the notification is sent.
     */
    public async execute(): Promise<void> {
        try {
            await this.preachingFacade.notifyUsersToSendReports();
        } 
        catch (error) {
            throw error;
        }
    }
}