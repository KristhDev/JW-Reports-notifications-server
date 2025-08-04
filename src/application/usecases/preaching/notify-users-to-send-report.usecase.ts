import { PreachingFacadeContract } from '@domain/contracts/facades';
import { NotifyUsersToSendReportUsecaseContract } from '@domain/contracts/usecases/preaching';

export class NotifyUsersToSendReportUseCase implements NotifyUsersToSendReportUsecaseContract {
    constructor (
        private readonly preachingFacade: PreachingFacadeContract
    ) {}

    public async execute(): Promise<void> {
        try {
            await this.preachingFacade.notifyUsersToSendReports();
        } 
        catch (error) {
            throw error;
        }
    }
}