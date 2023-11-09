import dayjs from 'dayjs';
import dotenv from 'dotenv';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { Server } from './src/server';

dayjs.extend(timezone);
dayjs.extend(utc);

dotenv.config();

const server = new Server();
server.listen();