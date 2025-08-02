import { LoggerAdapterContract, TimeAdapterContract } from '../../domain/contracts/adapters';

import { CoursesFacadeContract } from '../../domain/contracts/facades';
import { CoursesDatasourceContract } from '../../domain/contracts/datasources';

export class CoursesFacade implements CoursesFacadeContract {
    constructor (
        private readonly timeAdapter: TimeAdapterContract,
        private readonly loggerAdapter: LoggerAdapterContract,
        private readonly coursesDatasource: CoursesDatasourceContract
    ) {}

    public async notifyUsersWithPendingLessons(): Promise<void> {
        try {
            const usersIds = await this.coursesDatasource.getUsersIdsOfCoursesThatHavePendingLessonsNow();

            if (usersIds.length === 0) {
                const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
                this.loggerAdapter.info(`${ hour } There are no courses for today.`);

                return;
            }

            // TODO: send notifications
            // await this.notificationsService.sendCoursesDailyNotification(usersIds);

            const hour = this.timeAdapter.nowWithFormat('HH:mm:ss');
            this.loggerAdapter.info(`${ hour } Courses notifications sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}