import { Response } from 'express';

export interface JsonBody {
    status: number;
    message?: string;
    [key: string]: any;
}

export type JsonResponse = Response<JsonBody>;