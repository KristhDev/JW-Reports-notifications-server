import dayjs from 'dayjs';

/* Supabase */
import { supabase } from './supabase';

/* Utils */
import { sendNotification } from './utils';

/**
 * It checks if the current day is the last day of the month, if it is, it gets all the tokens from the
 * database and sends a notification to all of them.
 * @returns a promise.
 */
export const reportNotification = async () => {
    const now = dayjs();

    const currentDay = now.get('D');
    const lastDay = now.endOf('month').get('D');

    if (currentDay === lastDay) {
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.log(error);
            return;
        }

        const userIds = data.users.map(({ id }) => id);

        const notification = {
            contents: {
                en: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
                es: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
            },
            headings:{
                en: 'Entrega de informe',
                es: 'Entrega de informe',
            },
            include_external_user_ids: userIds,
        }

        sendNotification(notification);
    }
}

/**
 * It gets all the revisits that are not done and that have a next_visit date between today's date and
 * today's date.
 * 
 * Then it gets all the user_ids from those revisits and sends a notification to all of them.
 * @returns a Promise.
 */
export const revisitsNotification = async () => {
    const now = dayjs().format('YYYY-MM-DD');

    const { data: revisits, error: revisitsError } = await supabase.from('revisits')
        .select('user_id')
        .eq('done', false)
        .gte('next_visit', `${ now } 00:00`)
        .lte('next_visit', `${ now } 23:59`);

    if (revisitsError) {
        console.log(revisitsError);
        return;
    }

    if (revisits.length === 0) return;

    const arrayIds = new Set(revisits.map(({ user_id }) => user_id) as string[]);
    const userIds = [ ...arrayIds ];

    const notification = {
        contents: {
            es: 'Tienes revisitas para hoy, entra y ve cuáles son.',
            en: 'Tienes revisitas para hoy, entra y ve cuáles son.'
        },
        headings:{
            en: 'Revisitas',
            es: 'Revisitas',
        },
        include_external_user_ids: userIds,
    }

    sendNotification(notification);
}

/**
 * It gets all the lessons that are scheduled for today, then it gets the user_id of the users that are
 * going to have a lesson today, then it sends a notification to those users.
 * @returns a Promise.
 */
export const lessonsNotification = async () => {
    const now = dayjs().format('YYYY-MM-DD');

    const { data: revisits, error: revisitsError } = await supabase.from('lessons')
        .select('courses (user_id)')
        .eq('done', false)
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
            en: 'Tienes cursos que dar hoy, entra y ve quienes son.'
        },
        headings:{
            en: 'Cursos bíblicos',
            es: 'Cursos bíblicos',
        },
        include_external_user_ids: userIds,
    }

    sendNotification(notification);
}