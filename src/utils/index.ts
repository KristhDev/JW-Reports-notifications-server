import axios, { isAxiosError } from 'axios';

/**
 * It sends a notification to OneSignal using the OneSignal REST API.
 * @param {any} notification - The notification object.
 */
export const sendNotification = async (notification: any) => {
    try {
        await axios.post(
            'https://onesignal.com/api/v1/notifications',
            { app_id: process.env.ONESIGNAL_APP_ID, ...notification },
            { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${ process.env.ONESIGNAL_REST_API_KEY }`,
                } 
            }
        );
    } 
    catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
            return;
        }

        console.log(error);
    }
}