import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

/* Contracts */
import { HttpClientAdapterContract, LoggerAdapterContract } from '@domain/contracts/adapters';

/* Errors */
import { HttpError } from '@domain/errors';

/* Interfaces */
import { HttpClientOptions } from '@infrastructure/interfaces';

export class HttpClientAdapter implements HttpClientAdapterContract {
    constructor(
        private readonly loggerAdapter: LoggerAdapterContract,
    ) {}

    /**
     * Converts the HttpClientOptions to an AxiosRequestConfig.
     *
     * @param {HttpClientOptions} options The options to convert.
     * @return {AxiosRequestConfig} The converted AxiosRequestConfig.
     */
    private optionsToAxiosRequestConfig(options: HttpClientOptions): AxiosRequestConfig {
        return {
            headers: options.headers,
            params: options.queryParams,
        }
    }

    /**
     * Makes a POST request to the given URL with the given options.
     * 
     * @param {string} url The URL to make the request to.
     * @param {HttpClientOptions} [options] The options to make the request with. If not provided, the request will be made without any options.
     * @return {Promise<T>} The response data of the request.
     * @throws {HttpError} If the request fails or if the response status code is not 2xx. The error will have the same status code as the response.
     */
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