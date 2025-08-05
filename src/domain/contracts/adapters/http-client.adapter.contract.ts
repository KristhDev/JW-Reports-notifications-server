import { HttpClientOptions } from '@infrastructure/interfaces';

export abstract class HttpClientAdapterContract {
    public abstract post<T>(url: string, options?: HttpClientOptions): Promise<T>;
}
