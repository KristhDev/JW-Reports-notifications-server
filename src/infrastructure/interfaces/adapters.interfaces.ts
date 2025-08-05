export type AcceptHeader = 'application/json' | 'application/xml' | 'text/html' | 'text/plain' | 'text/csv' | string;
export type ContentTypeHeader = 'application/json' | 'application/xml' | 'multipart/form-data' | 'text/html' | 'text/plain' | 'text/csv' | string;

export type HttpHeaders = {
    Accept?: AcceptHeader;
    'Accept-Language'?: string;
    Authorization?: string;
    'Content-Type'?: ContentTypeHeader;
} | Record<string, string>;

export type HttpBody = Blob | BufferSource | FormData | URLSearchParams | string | Record<string, any>;

export interface HttpClientOptions {
    body?: HttpBody;
    headers?: HttpHeaders;
    queryParams?: Record<string, string>;
}

export interface LoggerOptions {
    logsDir?: string;
    logsFileName?: string;
    renderLogsInConsole?: boolean;
    uploadLogsToService?: boolean;
    writeLogsInFile?: boolean;
}

export interface TimeAdapterOptions {
    timezone?: string;
}

export interface UserAgentParsed {
    browser?: string;
    device?: string;
    os?: string;
    userAgent: string;
}