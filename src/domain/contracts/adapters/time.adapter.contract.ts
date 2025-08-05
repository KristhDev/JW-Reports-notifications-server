export abstract class TimeAdapterContract {
    public abstract format(date: Date | string | number, format: string): string;
    public abstract getCurrentDay(): number;
    public abstract getLastDayOfCurrentMonth(): number;
    public abstract nowWithFormat(format: string): string;
}