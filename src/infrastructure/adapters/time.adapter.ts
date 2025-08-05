import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/* Contracts */
import { TimeAdapterContract } from '@domain/contracts/adapters';

/* Interfaces */
import { TimeAdapterOptions } from '@infrastructure/interfaces';

export class TimeAdapter implements TimeAdapterContract {
    private readonly options: TimeAdapterOptions;
    private readonly defaultOptions: TimeAdapterOptions = {
        timezone: undefined
    }

    constructor(options?: TimeAdapterOptions) {
        this.options = { ...this.defaultOptions, ...options };

        dayjs.extend(timezone);
        dayjs.extend(utc);
    }

    /**
     * Returns the formatted date string.
     * 
     * @param {Date | string | number} date - The date to be formatted.
     * @param {string} format - The format to use for the date string.
     * @return {string} The formatted date string.
     */
    public format(date: Date | string | number, format: string): string {
        return dayjs(date).tz(this.options.timezone).format(format);
    }

    /**
     * Returns the current day of the month (1-31) as a number, depending on the user's timezone.
     * 
     * @return {number} The current day of the month (1-31) as a number.
     */
    public getCurrentDay(): number {
        return dayjs().tz(this.options.timezone).get('D');
    }

    /**
     * Returns the last day of the current month as a number, depending on the user's timezone.
     * 
     * @return {number} The last day of the current month as a number.
     */
    public getLastDayOfCurrentMonth(): number {
        return dayjs().tz(this.options.timezone).endOf('month').get('D');
    }

    /**
     * Returns the current date and time as a string in the specified format, depending on the user's timezone.
     * 
     * @param {string} format - The format to use for the date and time string.
     * @return {string} The current date and time as a string in the specified format.
     */
    public nowWithFormat(format: string): string {
        return dayjs().tz(this.options.timezone).format(format);
    }
}