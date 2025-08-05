export abstract class LoggerAdapterContract {
    public abstract error(message: string): void;
    public abstract info(message: string): void;
    public abstract success(message: string): void;
}