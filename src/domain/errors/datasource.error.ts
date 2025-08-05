import { BaseError } from './base.error';

export interface DatasourceErrorJson {
    message: string;
    data: { [key: string]: any };
}

export class DatasourceError extends BaseError<DatasourceErrorJson> {
    constructor(
        message: string,
        public data: { [key: string]: any }
    ) {
        super(message);
        this.name = 'DatasourceError';
    }

    public toJSON(): DatasourceErrorJson {
        return {
            message: this.message,
            data: this.data,
        }
    }

    public toString(): string {
        return `${ this.name } Message ${ this.message } Data ${ JSON.stringify(this.data) }`;
    }
}