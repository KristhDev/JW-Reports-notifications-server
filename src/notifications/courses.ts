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

    const { data: revisits, error: revisitsError } = await supabase.from('lessons')
        .select('courses (user_id)')
        .eq('done', false)
        .eq('courses.suspended', false)
        .eq('courses.finished', false)
        .gte('next_lesson', `${ now } 00:00`)
        .lte('next_lesson', `${ now } 23:59`);

    if (revisitsError) {
        console.log(revisitsError);
        return;
    }

    if (revisits.length === 0) return;

    const arrayIds = new Set(revisits.map(({ courses }) => 
        (Array.isArray(courses)) ? courses[0].user_id : courses!.user_id
    ) as string[]);

    const userIds = [ ...arrayIds ];

    const notification = {
        contents: {
            es: 'Tienes cursos que dar hoy, entra y ve quienes son.',
            // en: 'Tienes cursos que dar hoy, entra y ve quienes son.'
        },
        headings:{
            // en: 'Cursos bíblicos',
            es: 'Cursos bíblicos',
        },
        include_external_user_ids: userIds,
    }

    sendNotification(notification);
}