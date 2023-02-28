import dayjs from 'dayjs';
import dotenv from 'dotenv';
import { schedule } from 'node-cron';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

/* Notifications */
import { coursesNotification, reportNotification, revisitsNotification } from './src/notifications';

dotenv.config();

/* A cron job that runs every day at 6:00 AM. */
schedule('*/10 * * * * *', () => {
    reportNotification();
    revisitsNotification();
    coursesNotification();
}, { timezone: 'America/Managua' });