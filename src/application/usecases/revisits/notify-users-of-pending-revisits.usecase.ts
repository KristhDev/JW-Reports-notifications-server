/* Contracts */
import { RevisitsFacadeContract } from '@domain/contracts/facades';
import { NotifyUsersOfPendingRevisitsUsecaseContract } from '@domain/contracts/usecases/revisits';

export class NotifyUsersOfPendingRevisitsUsecase implements NotifyUsersOfPendingRevisitsUsecaseContract {
    constructor (
        private readonly revisitsFacade: RevisitsFacadeContract
    ) {}

    /**
     * Executes the use case to notify all users of their pending revisits for today.
     * 
     * @return {Promise<void>} The promise that resolves when the use case is complete.
     */
    public async execute (): Promise<void> {
        try {
            await this.revisitsFacade.notifyUsersOfPendingRevisits();
        } 
        catch (error) {
            throw error;
        }
    }
}