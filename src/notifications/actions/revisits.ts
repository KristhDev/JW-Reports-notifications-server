import { Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Server */
import { Http, JsonResponse } from '../../server';

/* Utils */
import { sendNotification } from '../../utils';

class RevisitsNotifications {
    /**
     * Retrieves the daily revisits from the 'revisits' table and sends notifications to the users.
     *
     * @param {Response} res - The HTTP response object
     * @return {Promise<JsonResponse | void>} Returns a promise that resolves to a JsonResponse or void if there are no revisits for today.
     */
    public static async daylyRevisits(res: Response): Promise<JsonResponse | void> {
        try {
            const now = dayjs().tz('America/Managua').format('YYYY-MM-DD');

            const { data, error, status } = await supabase.from('revisits')
                .select('user_id')
                .eq('done', false)
                .gte('next_visit', `${ now } 00:00`)
                .lte('next_visit', `${ now } 23:59`);

            if (error) return Http.sendResp(error.message, status, res);

            if (data.length === 0) {
                const hour = dayjs().tz('America/Managua');
                console.log(`${ hour.format('HH:mm:ss') } There are no revisits for today.`);

                return;
            }

            const arrayIds = new Set(data.map(({ user_id }) => user_id) as string[]);
            const userIds = [ ...arrayIds ];

            const notification = {
                contents: 'Tienes revisitas para hoy, entra y ve cuáles son.',
                headings: 'Revisitas',
                external_user_ids: userIds
            }

            await sendNotification(notification);
            const hour = dayjs().tz('America/Managua');
            console.log(`${ hour.format('HH:mm:ss') } Revisits notifications sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}

export default RevisitsNotifications;