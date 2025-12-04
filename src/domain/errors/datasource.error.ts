import { BaseError } from './base.error';

export interface DataSourceErrorJson {
    message: string;
    data: { [key: string]: any };
}

export class DataSourceError extends BaseError<DataSourceErrorJson> {
    constructor(
        message: string,
        public data: { [key: string]: any }
    ) {
        super(message);
        this.name = 'DatasourceError';
    }

    public toJSON(): DataSourceErrorJson {
        return {
            message: this.message,
            data: this.data,
        }
    }

    public toString(): string {
        return `${ this.name } Message ${ this.message } Data ${ JSON.stringify(this.data) }`;
    }
}