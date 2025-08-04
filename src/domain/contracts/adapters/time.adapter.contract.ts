export abstract class TimeAdapterContract {
    public abstract getCurrentDay(): number;
    public abstract getLastDayOfCurrentMonth(): number;
    public abstract nowWithFormat(format: string): string;
}