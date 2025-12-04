export abstract class CoursesDataSourceContract {
    public abstract getUsersIdsOfCoursesThatHavePendingLessonsNow(): Promise<string[]>;
}