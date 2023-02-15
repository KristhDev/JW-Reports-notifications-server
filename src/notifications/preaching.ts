import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../supabase';

/* Utils */
import { sendNotification } from '../utils';

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