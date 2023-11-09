import { Request, Response } from 'express';
import dayjs from 'dayjs';

/* Supabase */
import { supabase } from '../../supabase';

/* Server */
import { Http, JsonResponse } from '../../server';

/* Utils */
import { sendNotification } from '../../utils';

class ApplicationNotifications {

    /**
     * Generate the function comment for the newVersion function.
     *
     * @param {Response} res - the response object
     * @return {Promise<void>} - a promise that resolves to nothing
     */
    public static async newVersion(req: Request, res: Response): Promise<JsonResponse | void> {
        try {
            const { data, error } = await supabase.auth.admin.listUsers();
            if (error) return Http.sendResp(error.message, 500, res);

            const { version, launchUrl } = req.body;

            const userIds = data.users.map(({ id }) => id);

            const notification = {
                contents: `Ya esta disponible la nueva versión de JW Reports ${version}. Para obtenerla preciona está notificación y descargala.`,
                headings: 'Actualización de JW Reports',
                external_user_ids: userIds,
                launchUrl
            }

            await sendNotification(notification);
            const hour = dayjs().tz('America/Managua');
            console.log(`${ hour.format('HH:mm:ss') } New version notification sent.`);
        } 
        catch (error) {
            throw error;
        }
    }
}

export default ApplicationNotifications;