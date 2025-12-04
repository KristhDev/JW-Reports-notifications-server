export abstract class LoggerAdapterContract {
    public abstract error(message: string, context?: Record<string, any>): void;
    public abstract info(message: string, context?: Record<string, any>): void;
    public abstract success(message: string, context?: Record<string, any>): void;
}