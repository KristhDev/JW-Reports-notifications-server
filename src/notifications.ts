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
        const { data, error } = await supabase.from('devices').select();

        if (error) {
            console.log(error);
            return;
        }

        const tokens = data.map((device) => device.token);

        const notification = {
            contents: {
                en: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
                es: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
            },
            headings:{
                en: 'Entrega de informe',
                es: 'Entrega de informe',
            },
            include_player_ids: tokens,
        }

        sendNotification(notification);
    }
}

/**
 * It gets all the revisits that are not done and that have a next_visit date between today's 00:00 and
 * 23:59, then it gets all the devices that belong to those revisits, and finally it sends a
 * notification to those devices.
 * 
 * The problem is that the notification is sent to all the devices, not only to the ones that belong to
 * the revisits.
 * 
 * I've tried to use the .in() method in different ways, but I always get the same result.
 * 
 * I've also tried to use the .where() method, but I get the same result.
 * 
 * I've also tried to use the .where() method with the .in() method, but I get the same result.
 * 
 * I've also tried to use the .where() method with the .eq() method, but I get the same result.
 * 
 * I've
 * @returns a promise.
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

    const { data: devices, error: devicesError } = await supabase.from('devices')
        .select('token')
        .in('user_id', userIds);

    if (devicesError) {
        console.log(devicesError);
        return;
    }

    if (devices.length === 0) return;

    const tokens = devices.map((device) => device.token);

    const notification = {
        contents: {
            es: 'Tienes revisitas para hoy, entra y ve cuáles son.',
            en: 'Tienes revisitas para hoy, entra y ve cuáles son.'
        },
        headings:{
            en: 'Revisitas',
            es: 'Revisitas',
        },
        include_player_ids: tokens,
    }

    sendNotification(notification);
}

/**
 * It gets all the lessons that are not done and that are scheduled for today, then it gets the devices
 * of the users that have those lessons and sends a notification to those devices.
 * 
 * The problem is that the notification is sent to all the devices of all the users, not only to the
 * devices of the users that have lessons scheduled for today.
 * 
 * I've tried to change the order of the queries, but it doesn't work.
 * 
 * I've also tried to use the `.join()` method, but it doesn't work either.
 * 
 * I've also tried to use the `.where()` method, but it doesn't work either.
 * 
 * I've also tried to use the `.and()` method, but it doesn't work either.
 * 
 * I've also tried to use the `.or()` method, but it doesn't work either.
 * @returns a promise.
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

    const { data: devices, error: devicesError } = await supabase.from('devices')
        .select('token')
        .in('user_id', userIds);

    if (devicesError) {
        console.log(devicesError);
        return;
    }

    if (devices.length === 0) return;

    const tokens = devices.map((device) => device.token);

    const notification = {
        contents: {
            es: 'Tienes cursos que dar hoy, entra y ve quienes son.',
            en: 'Tienes cursos que dar hoy, entra y ve quienes son.'
        },
        headings:{
            en: 'Cursos bíblicos',
            es: 'Cursos bíblicos',
        },
        include_player_ids: tokens,
    }

    sendNotification(notification);
}