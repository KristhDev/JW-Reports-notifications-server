import dayjs from 'dayjs';
import dotenv from 'dotenv';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import server from './src/server';

dayjs.extend(timezone);
dayjs.extend(utc);

dotenv.config();

server.listen(process.env.PORT);

console.log(`Server running on port ${ process.env.PORT }`);