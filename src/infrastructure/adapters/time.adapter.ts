import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { TimeAdapterContract } from '../../domain/contracts/adapters';

export class TimeAdapter implements TimeAdapterContract {
    constructor() {
        dayjs.extend(timezone);
        dayjs.extend(utc);
    }

    public nowWithFormat(format: string): string {
        return dayjs().tz('America/Managua').format(format);
    }
}