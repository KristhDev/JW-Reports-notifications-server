import { Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Server */
import { Http, JsonResponse } from '../../server';

/* Utils */
import { sendNotification } from '../../utils';

class PreachingNotifications {
    /**
     * Generates a report reminder and sends notifications to users at the end of the month.
     *
     * @param {Response} res - The response object to send HTTP responses.
     * @return {Promise<JsonResponse | void>} - A promise that resolves to a JsonResponse or void.
     */
    public static async rememberReport(res: Response): Promise<JsonResponse | void> {
        try {
            const now = dayjs().tz('America/Managua');

            const currentDay = now.get('D');
            const lastDay = now.endOf('month').get('D');

            if (currentDay !== lastDay) {
                const hour = dayjs().tz('America/Managua');
                console.log(`${ hour.format('HH:mm:ss') } Reports are not due yet.`);
            }

            const { data, error } = await supabase.auth.admin.listUsers();

            if (error) return Http.sendResp(error.message, 500, res);

            const userIds = data.users.map(({ id }) => id);

            const notification = {
                contents: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
                headings: 'Entrega de informe',
                external_user_ids: userIds,
            }

            await sendNotification(notification);
            const hour = dayjs().tz('America/Managua');
            console.log(`${ hour.format('HH:mm:ss') } Report notification sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}

export default PreachingNotifications;