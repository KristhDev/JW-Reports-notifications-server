import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

import { HttpClientAdapterContract, LoggerAdapterContract } from '@domain/contracts/adapters';

import { HttpError } from '@domain/errors';

import { HttpClientOptions } from '@infrastructure/interfaces';

export class HttpClientAdapter implements HttpClientAdapterContract {
    constructor(
        private readonly loggerAdapter: LoggerAdapterContract,
    ) {}

    private optionsToAxiosRequestConfig(options: HttpClientOptions): AxiosRequestConfig {
        return {
            headers: options.headers,
            params: options.queryParams,
        }
    }

    public async post<T>(url: string, options?: HttpClientOptions): Promise<T> {
        try {
            const axiosRequestConfig = options 
                ? this.optionsToAxiosRequestConfig(options)
                : undefined;

            const { data } = await axios.post(url, options?.body, axiosRequestConfig);
            return data;
        } 
        catch (error) {
            let throwError = HttpError.internalServerError();
            if (isAxiosError(error)) throwError = HttpError.badRequest(error.message);

            this.loggerAdapter.error(JSON.stringify(error));
            throw throwError;
        }
    }
}