import { AppNewVersionDto } from '../../dtos/app';

export abstract class AppFacadeContract {
    public abstract notifyNewVersion(appNewVersionDto: AppNewVersionDto): Promise<void>;
}