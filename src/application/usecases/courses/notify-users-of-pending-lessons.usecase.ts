import { NotifyUsersOfPendingLessonsUsecaseContract } from '../../../domain/contracts/usecases/courses';
import { CoursesFacadeContract } from '../../../domain/contracts/facades';

export class NotifyUsersOfPendingLessonsUseCase implements NotifyUsersOfPendingLessonsUsecaseContract {
    constructor (
        private readonly coursesFacade: CoursesFacadeContract
    ) {}

    public async execute (): Promise<void> {
        try {
            await this.coursesFacade.notifyUsersOfPendingLessons();
        } 
        catch (error) {
            throw error;
        }
    }
}