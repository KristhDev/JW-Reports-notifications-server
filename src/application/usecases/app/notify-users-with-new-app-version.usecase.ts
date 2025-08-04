import { AppFacadeContract } from '../../../domain/contracts/facades';
import { NotifyUsersWithNewAppVersionUsecaseContract } from '../../../domain/contracts/usecases/app';

import { AppNewVersionDto } from '../../../domain/dtos/app';

export class NotifyUsersWithNewAppVersionUseCase implements NotifyUsersWithNewAppVersionUsecaseContract {
    constructor (
        private readonly appFacade: AppFacadeContract
    ) {}

    public async execute(appNewVersionDto: AppNewVersionDto): Promise<void> {
        try {
            await this.appFacade.notifyNewVersion(appNewVersionDto);
        } 
        catch (error) {
            throw error;
        }
    }
}