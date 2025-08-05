export abstract class CoursesFacadeContract {
    public abstract notifyUsersOfPendingLessons(): Promise<void>;
}