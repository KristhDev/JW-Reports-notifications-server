import dayjs from 'dayjs';
import dotenv from 'dotenv';
import { schedule } from 'node-cron';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

const hour = dayjs().tz('America/Managua');
console.log(hour.format('HH:mm:ss'));

/* Notifications */
import { coursesNotification, reportNotification, revisitsNotification } from './src/notifications';

dotenv.config();

/* A cron job that runs every day at 6:00 AM. */
schedule('0 6 * * *', () => {
    reportNotification();
    revisitsNotification();
    coursesNotification();

    console.log('Notifications sent to users');
}, { timezone: 'America/Managua' });