export abstract class BaseError<T> extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BaseError';
    }

    public abstract toJSON(): T;
    public abstract toString(): string;
}