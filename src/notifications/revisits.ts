import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../supabase';

/* Utils */
import { sendNotification } from '../utils';

/**
 * It gets all the revisits that are not done and that have a next_visit date between today's date and
 * today's date.
 * 
 * Then it gets all the user_ids from those revisits and sends a notification to all of them.
 * @returns a Promise.
 */
export const revisitsNotification = async () => {
    const now = dayjs().subtract(6, 'hour').format('YYYY-MM-DD');

    const { data, error } = await supabase.from('revisits')
        .select('user_id')
        .eq('done', false)
        .gte('next_visit', `${ now } 00:00`)
        .lte('next_visit', `${ now } 23:59`);

    if (error) {
        console.log(error);
        return;
    }

    if (data.length === 0) return;

    const arrayIds = new Set(data.map(({ user_id }) => user_id) as string[]);
    const userIds = [ ...arrayIds ];

    const notification = {
        contents: {
            en: 'Tienes revisitas para hoy, entra y ve cuáles son.'
        },
        headings:{
            en: 'Revisitas',
        },
        include_external_user_ids: userIds,
    }

    sendNotification(notification);
}