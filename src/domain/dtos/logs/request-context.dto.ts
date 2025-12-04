import { Request } from 'express';

/* Config */
import { userAgentAdapter } from '@config/di';

/* Interfaces */
import { UserAgentParsed } from '@infrastructure/interfaces';

export class RequestContextDto {
    private constructor(
        public readonly method: string,
        public readonly path: string,
        public readonly ip?: string,
        public readonly query?: object,
        public readonly params?: object,
        public readonly headers?: object,
        public readonly userAgent?: UserAgentParsed,
    ) {}

    /**
     * Creates a request context from a request.
     *
     * @param {Request} req - The request.
     * @returns {RequestContextDto} The request context.
     */
    public static fromRequest(req: Request): RequestContextDto {
        const userAgentHeader = req.headers['user-agent'];
        const userAgent = userAgentHeader ? userAgentAdapter.parse(userAgentHeader) : undefined;

        return new RequestContextDto(
            req.method,
            req.path,
            req.ip,
            req.query,
            req.params,
            req.headers,
            userAgent
        );
    }

    /**
     * Converts the request context to a JSON object.
     *
     * @returns {object} The request context as a JSON object.
     */
    public toJSON() {
        return {
            ip: this.ip,
            method: this.method,
            path: this.path,
            query: this.query,
            params: this.params,
            headers: this.headers,
            userAgent: this.userAgent
        }
    }
}