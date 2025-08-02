import { NotifyUsersWithPendingLessonsUsecaseContract } from '../../../domain/contracts/usecases/courses';
import { CoursesFacadeContract } from '../../../domain/contracts/facades';

export class NotifyUsersWithPendingLessonsUseCase implements NotifyUsersWithPendingLessonsUsecaseContract {
    constructor (
        private readonly coursesFacade: CoursesFacadeContract
    ) {}

    public async execute (): Promise<void> {
        try {
            await this.coursesFacade.notifyUsersWithPendingLessons();
        } 
        catch (error) {
            throw error;
        }
    }
}