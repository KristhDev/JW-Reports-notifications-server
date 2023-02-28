import { Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Utils */
import { sendNotification } from '../../utils';

/**
 * It gets all the courses that are not done, not suspended, not finished, and that have a next lesson
 * today, and then sends a notification to the users who have those courses.
 * @param {Response} res - Response - This is the response object from the express server.
 * @returns An array of objects.
 */
export const coursesNotification = async (res: Response) => {
    const now = dayjs().tz('America/Managua').format('YYYY-MM-DD');

    const { data, error, status } = await supabase.from('lessons')
        .select('courses (user_id)')
        .eq('done', false)
        .eq('courses.suspended', false)
        .eq('courses.finished', false)
        .gte('next_lesson', `${ now } 00:00`)
        .lte('next_lesson', `${ now } 23:59`);

    if (error) {
        console.log(error);

        return res.status(status).json({
            msg: error.message,
            status: status
        });
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
        contents: {
            en: 'Tienes cursos que dar hoy, entra y ve quienes son.'
        },
        headings:{
            en: 'Cursos bíblicos',
        },
        include_external_user_ids: userIds,
    }

    sendNotification(notification).then(() => {
        const hour = dayjs().tz('America/Managua');
        console.log(`${ hour.format('HH:mm:ss') } Courses notifications sent.`);
    });
}