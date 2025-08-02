export abstract class CoursesFacadeContract {
    public abstract notifyUsersWithPendingLessons(): Promise<void>;
}