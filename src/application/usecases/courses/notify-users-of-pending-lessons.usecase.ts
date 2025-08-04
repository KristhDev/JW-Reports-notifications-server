/* Contracts */
import { CoursesFacadeContract } from '@domain/contracts/facades';
import { NotifyUsersOfPendingLessonsUsecaseContract } from '@domain/contracts/usecases/courses';

export class NotifyUsersOfPendingLessonsUseCase implements NotifyUsersOfPendingLessonsUsecaseContract {
    constructor (
        private readonly coursesFacade: CoursesFacadeContract
    ) {}

    /**
     * Executes the use case to notify users of pending lessons.
     * 
     * @returns {Promise<void>} The promise that resolves when the notification process is complete.
     * @throws Will throw an error if the notification process fails.
     */
    public async execute (): Promise<void> {
        try {
            await this.coursesFacade.notifyUsersOfPendingLessons();
        } 
        catch (error) {
            throw error;
        }
    }
}