import { NewAppVersionNotificationOptions } from '../../../infrastructure/interfaces';

export abstract class NotificationsServiceContract {
    public abstract sendCoursesDailyNotification(usersIds: string[]): Promise<void>;
    public abstract sendNewAppVersionNotification(options: NewAppVersionNotificationOptions): Promise<void>;
    public abstract sendRevisitsDailyNotification(usersIds: string[]): Promise<void>;
    public abstract sendPreachingReportNotification(usersIds: string[]): Promise<void>;
}