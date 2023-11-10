import { Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Server */
import { Http, JsonResponse } from '../../server';

/* Utils */
import { sendNotification } from '../../utils';

class CoursesNotifications {

    /**
     * Sends notifications to users with courses scheduled for today.
     *
     * @param {Response} res - the response object
     * @return {Promise<JsonResponse | void>} - a promise that resolves to a JsonResponse or void
     */
    public static async dailyCourses(res: Response): Promise<JsonResponse | void> {
        try {
            const now = dayjs().tz('America/Managua').format('YYYY-MM-DD');

            const { data, error, status } = await supabase.from('lessons')
                .select<'courses (user_id)', { courses: { user_id: string } }>('courses (user_id)')
                .eq('done', false)
                .eq('courses.suspended', false)
                .eq('courses.finished', false)
                .gte('next_lesson', `${ now } 00:00`)
                .lte('next_lesson', `${ now } 23:59`);

            if (error) {
                return Http.sendResp(error.message, status, res);
            }

            if (data.length === 0) {
                const hour = dayjs().tz('America/Managua');
                console.log(`${ hour.format('HH:mm:ss') } There are no courses for today.`);

                return;
            }

            const arrayIds = new Set(data.map(({ courses }) => 
                (Array.isArray(courses)) ? courses[0].user_id : courses!.user_id
            ) as string[]);

            const userIds = [ ...arrayIds ];

            const notification = {
                contents: 'Tienes cursos que dar hoy, entra y ve quienes son.',
                headings:'Cursos bíblicos',
                external_user_ids: userIds
            }

            await sendNotification(notification);
            const hour = dayjs().tz('America/Managua');
            console.log(`${ hour.format('HH:mm:ss') } Courses notifications sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}

export default CoursesNotifications;