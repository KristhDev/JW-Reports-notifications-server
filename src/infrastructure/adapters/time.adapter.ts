import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { TimeAdapterContract } from '@domain/contracts/adapters';

export class TimeAdapter implements TimeAdapterContract {
    constructor() {
        dayjs.extend(timezone);
        dayjs.extend(utc);
    }

    public getCurrentDay(): number {
        return dayjs().tz('America/Managua').get('D');
    }

    public getLastDayOfCurrentMonth(): number {
        return dayjs().tz('America/Managua').endOf('month').get('D');
    }

    public nowWithFormat(format: string): string {
        return dayjs().tz('America/Managua').format(format);
    }
}