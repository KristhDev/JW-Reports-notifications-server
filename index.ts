import dotenv from 'dotenv';
import dayjs from 'dayjs';
import { schedule } from 'node-cron';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/* Notifications */
import { coursesNotification, reportNotification, revisitsNotification } from './src/notifications';

dotenv.config();

/* A cron job that runs every day at 6:00 AM. */
schedule('56 11 * * *', () => {
    reportNotification();
    revisitsNotification();
    coursesNotification();

    console.log('Notifications sent to users');
}, { timezone: 'America/Managua' });