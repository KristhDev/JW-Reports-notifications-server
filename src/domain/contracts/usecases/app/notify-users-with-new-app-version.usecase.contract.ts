import { AppNewVersionDto } from '../../../dtos/app';

export abstract class NotifyUsersWithNewAppVersionUsecaseContract {
    public abstract execute(appNewVersionDto: AppNewVersionDto): Promise<void>;
}