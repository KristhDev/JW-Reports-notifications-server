import axios, { isAxiosError } from 'axios';

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
        }
    }
}