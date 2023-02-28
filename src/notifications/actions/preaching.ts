import { Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Utils */
import { sendNotification } from '../../utils';

/**
 * It sends a notification to all users on the last day of the month
 * @param {Response} res - Response - The response object from the request.
 * @returns a promise.
 */
export const reportNotification = async (res: Response) => {
    const now = dayjs().tz('America/Managua');

    const currentDay = now.get('D');
    const lastDay = now.endOf('month').get('D');

    if (currentDay === lastDay) {
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.log(error);

            return res.status(error.status || 500).json({
                msg: error.message,
                status: error.status || 500
            });;
        }

        const userIds = data.users.map(({ id }) => id);

        const notification = {
            contents: {
                en: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
            },
            headings:{
                en: 'Entrega de informe',
            },
            include_external_user_ids: userIds,
        }

        sendNotification(notification).then(() => {
            const hour = dayjs().tz('America/Managua');
            console.log(`${ hour.format('HH:mm:ss') } Report notification sent.`);
        });
    }
    else {
        const hour = dayjs().tz('America/Managua');
        console.log(`${ hour.format('HH:mm:ss') } Reports are not due yet.`);
    }
}