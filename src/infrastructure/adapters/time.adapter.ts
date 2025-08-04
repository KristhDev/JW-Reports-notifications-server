import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/* Contracts */
import { TimeAdapterContract } from '@domain/contracts/adapters';

export class TimeAdapter implements TimeAdapterContract {
    constructor() {
        dayjs.extend(timezone);
        dayjs.extend(utc);
    }

    /**
     * Returns the current day of the month (1-31) as a number, depending on the user's timezone.
     * 
     * @return {number} The current day of the month (1-31) as a number.
     */
    public getCurrentDay(): number {
        return dayjs().tz('America/Managua').get('D');
    }

    /**
     * Returns the last day of the current month as a number, depending on the user's timezone.
     * 
     * @return {number} The last day of the current month as a number.
     */
    public getLastDayOfCurrentMonth(): number {
        return dayjs().tz('America/Managua').endOf('month').get('D');
    }

    /**
     * Returns the current date and time as a string in the specified format, depending on the user's timezone.
     * 
     * @param {string} format - The format to use for the date and time string.
     * @return {string} The current date and time as a string in the specified format.
     */
    public nowWithFormat(format: string): string {
        return dayjs().tz('America/Managua').format(format);
    }
}