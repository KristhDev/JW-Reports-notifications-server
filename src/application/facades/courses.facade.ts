/* Contracts */
import { LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';
import { CoursesFacadeContract } from '@domain/contracts/facades';
import { CoursesDatasourceContract } from '@domain/contracts/datasources';
import { NotificationsServiceContract } from '@domain/contracts/services';

export class CoursesFacade implements CoursesFacadeContract {
    constructor (
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly coursesDatasource: CoursesDatasourceContract,
        private readonly notificationsService: NotificationsServiceContract
    ) {}

    /**
     * Notifies users with pending lessons for today.
     *
     * @return {Promise<void>} A promise that resolves when the notification process is complete.
     */
    public async notifyUsersOfPendingLessons(): Promise<void> {
        try {
            const usersIds = await this.coursesDatasource.getUsersIdsOfCoursesThatHavePendingLessonsNow();

            if (usersIds.length === 0) {
                const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
                this.loggerAdapter.info(`${ hour } There are no courses for today.`);

                return;
            }

            await this.notificationsService.sendCoursesDailyNotification(usersIds);

            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            this.loggerAdapter.info(`${ hour } Courses notifications sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}