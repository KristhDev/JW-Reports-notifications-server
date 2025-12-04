/* Supabase */
import { supabase } from '@config/supabase';

/* Contracts */
import { TimeAdapterContract } from '@domain/contracts/adapters';
import { CoursesDataSourceContract } from '@domain/contracts/datasources';

/* Errors */
import { DataSourceError } from '@domain/errors';

/* Interfaces */
import { LessonWithOnlyCourses } from '@infrastructure/interfaces';

export class CoursesDataSource implements CoursesDataSourceContract {
    constructor(
        private readonly timeAdapter: TimeAdapterContract
    ) {}

    /**
     * Gets the IDs of users that have courses with pending lessons for today.
     * 
     * @return {Promise<string[]>} The IDs of users that have courses with pending lessons for today.
     */
    public async getUsersIdsOfCoursesThatHavePendingLessonsNow(): Promise<string[]> {
        const now = this.timeAdapter.nowWithFormat('YYYY-MM-DD');

        const { data, error } = await supabase.from('lessons')
            .select<'courses (user_id)', LessonWithOnlyCourses>('courses (user_id)')
            .eq('done', false)
            .eq('courses.suspended', false)
            .eq('courses.finished', false)
            .gte('next_lesson', `${ now } 00:00`)
            .lte('next_lesson', `${ now } 23:59`);

        if (error) {
            const errorData = { code: error.code, details: error.details, hint: error.hint, message: error.message };
            throw new DataSourceError(error.message, errorData);
        }

        const userIds = new Set(data.map(({ courses }) => 
            (Array.isArray(courses)) ? courses[0].user_id : courses.user_id
        ));

        return Array.from(userIds);
    }
}