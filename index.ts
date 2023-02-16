import dotenv from 'dotenv';
import { schedule } from 'node-cron';

/* Notifications */
import { coursesNotification, reportNotification, revisitsNotification } from './src/notifications';

dotenv.config();

/* A cron job that runs every day at 6:00 AM. */
schedule('17 12 * * *', () => {
    reportNotification();
    revisitsNotification();
    coursesNotification();

    console.log('Notifications sent to users');
}, { timezone: 'America/Managua' });