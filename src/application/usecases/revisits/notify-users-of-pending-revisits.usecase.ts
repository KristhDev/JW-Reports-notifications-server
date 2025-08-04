import { RevisitsFacadeContract } from '../../../domain/contracts/facades';
import { NotifyUsersOfPendingRevisitsUsecaseContract } from '../../../domain/contracts/usecases/revisits';

export class NotifyUsersOfPendingRevisitsUsecase implements NotifyUsersOfPendingRevisitsUsecaseContract {
    constructor (
        private readonly revisitsFacade: RevisitsFacadeContract
    ) {}

    public async execute (): Promise<void> {
        try {
            await this.revisitsFacade.notifyUsersOfPendingRevisits();
        } 
        catch (error) {
            throw error;
        }
    }
}