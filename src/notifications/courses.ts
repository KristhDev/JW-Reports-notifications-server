import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../supabase';

/* Utils */
import { sendNotification } from '../utils';

/**
 * It gets all the lessons that are scheduled for today, then it gets the user_id of the users that are
 * going to have a course today, then it sends a notification to those users.
 * @returns a Promise.
 */
export const coursesNotification = async () => {
    const now = dayjs().format('YYYY-MM-DD');
    const hour = dayjs();
    console.log(dayjs.tz(hour.format('HH:mm:ss'), 'America/Managua'));

    const { data, error } = await supabase.from('lessons')
        .select('courses (user_id)')
        .eq('done', false)
        .eq('courses.suspended', false)
        .eq('courses.finished', false)
        .gte('next_lesson', `${ now } 00:00`)
        .lte('next_lesson', `${ now } 23:59`);

    if (error) {
        console.log(error);
        return;
    }

    if (data.length === 0) return;

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

    sendNotification(notification);
}