import { Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Utils */
import { sendNotification } from '../../utils';

/**
 * It gets all the revisits that are due today and sends a notification to the users that have them
 * @param {Response} res - Response - This is the response object from the server.
 * @returns the result of the sendNotification function.
 */
export const revisitsNotification = async (res: Response) => {
    const now = dayjs().tz('America/Managua').format('YYYY-MM-DD');

    const { data, error, status } = await supabase.from('revisits')
        .select('user_id')
        .eq('done', false)
        .gte('next_visit', `${ now } 00:00`)
        .lte('next_visit', `${ now } 23:59`);

    if (error) {
        console.log(error);

        return res.status(status).json({
            msg: error.message,
            status: status
        });
    }

    if (data.length === 0) {
        const hour = dayjs().tz('America/Managua');
        console.log(`${ hour.format('HH:mm:ss') } There are no revisits for today.`);

        return;
    };

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

    sendNotification(notification).then(() => {
        const hour = dayjs().tz('America/Managua');
        console.log(`${ hour.format('HH:mm:ss') } Revisits notifications sent.`);
    });;
}