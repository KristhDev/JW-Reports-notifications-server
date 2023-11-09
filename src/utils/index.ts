import axios from 'axios';

export interface NotificationOptions {
    contents: string;
    external_user_ids: string[];
    headings: string;
    launchUrl?: string;
}

/**
 * Sends a notification with the given options.
 *
 * @param {NotificationOptions} options - The options for the notification.
 * @return {Promise<void>} A promise that resolves when the notification is sent.
 */
export const sendNotification = async ({ contents, external_user_ids, headings, launchUrl }: NotificationOptions): Promise<void> => {
    try {
        let body = {
            app_id: process.env.ONESIGNAL_APP_ID!,
            contents: { en: contents },
            headings: { en: headings },
            include_aliases: {
                external_id: external_user_ids
            },
            target_channel: 'push',
        }

        if (launchUrl) body = Object.assign(body, { url: launchUrl });

        await axios.post('https://onesignal.com/api/v1/notifications', 
            body,
            {
                headers: {
                Authorization: `Basic ${ process.env.ONESIGNAL_REST_API_KEY }`,
                Accept: 'application/json',
            }
        });
    } 
    catch (error) {
        throw error;
    }
}