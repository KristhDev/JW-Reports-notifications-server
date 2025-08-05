export abstract class CoursesDatasourceContract {
    public abstract getUsersIdsOfCoursesThatHavePendingLessonsNow(): Promise<string[]>;
}