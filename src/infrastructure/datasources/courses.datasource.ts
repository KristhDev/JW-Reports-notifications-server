import { supabase } from '../../config/supabase';

import { TimeAdapterContract } from '../../domain/contracts/adapters';
import { CoursesDatasourceContract } from '../../domain/contracts/datasources';

export class CoursesDatasource implements CoursesDatasourceContract {
    constructor(
        private readonly timeAdapter: TimeAdapterContract
    ) {}

    public async getUsersIdsOfCoursesThatHavePendingLessonsNow(): Promise<string[]> {
        const now = this.timeAdapter.nowWithFormat('YYYY-MM-DD');

        const { data, error } = await supabase.from('lessons')
            .select<'courses (user_id)', { courses: { user_id: string } }>('courses (user_id)')
            .eq('done', false)
            .eq('courses.suspended', false)
            .eq('courses.finished', false)
            .gte('next_lesson', `${ now } 00:00`)
            .lte('next_lesson', `${ now } 23:59`);

        if (error) throw new Error(error.message);

        const userIds = new Set(data.map(({ courses }) => 
            (Array.isArray(courses)) ? courses[0].user_id : courses!.user_id
        ));

        return [ ...userIds ];
    }
}