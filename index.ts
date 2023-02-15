import dotenv from 'dotenv';
import { schedule } from 'node-cron';

/* Notifications */
import { coursesNotification, reportNotification, revisitsNotification } from './src/notifications';

dotenv.config();

/* A cron job that runs every day at 6:00 AM. */
schedule('0 6 * * *', () => {
    reportNotification();
    revisitsNotification();
    coursesNotification();
});