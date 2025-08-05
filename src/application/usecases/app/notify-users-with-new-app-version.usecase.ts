/* Contracts */
import { AppFacadeContract } from '@domain/contracts/facades';
import { NotifyUsersWithNewAppVersionUsecaseContract } from '@domain/contracts/usecases/app';

/* Dtos */
import { AppNewVersionDto } from '@domain/dtos/app';

export class NotifyUsersWithNewAppVersionUseCase implements NotifyUsersWithNewAppVersionUsecaseContract {
    constructor (
        private readonly appFacade: AppFacadeContract
    ) {}

    /**
     * Executes the use case to notify all users of a new app version.
     * 
     * @param {AppNewVersionDto} appNewVersionDto - The new version of the app.
     * @returns {Promise<void>} The promise that resolves when the use case is complete.
     */
    public async execute(appNewVersionDto: AppNewVersionDto): Promise<void> {
        try {
            await this.appFacade.notifyNewVersion(appNewVersionDto);
        } 
        catch (error) {
            throw error;
        }
    }
}