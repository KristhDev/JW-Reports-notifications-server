import express, { Application } from 'express';
import cors from 'cors';

/* Environment */
import { env } from '@config/env';

/* Contracts */
import { LoggerAdapterContract } from '@domain/contracts/adapters';

/* Middlewares */
import { authCheck } from '@auth/middlewares';
import { loggerRequest, loggerResponse } from './middlewares';

/* Routes */
import { notificationsRouter } from '@notifications/routes';

class Server {
    private port: number = Number(env.PORT || 9000);
    private app: Application = express();

    constructor(
        private readonly loggerAdapter: LoggerAdapterContract,
    ) {}

    /**
     * Initializes the middlewares for the Express app.
     *
     * This function adds the necessary middleware functions to the app.
     * The middlewares added are:
     * - cors: handles Cross-Origin Resource Sharing
     * - express.json: parses incoming JSON requests
     * - authCheck: handles authentication checks
     *
     * @private
     * @return {void} - No return value
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(loggerRequest);
        this.app.use(loggerResponse);
        this.app.use(authCheck);
    }

    /**
     * Defines the routes for the application.
     *
     * @private
     * @return {void} - No return value
     */
    private routes(): void {
        this.app.use('/api/notifications', notificationsRouter);
    }

    /**
     * Listens for incoming requests and starts the server.
     *
     * @return {void} This function does not return anything.
     */
    public listen(): void {
        this.middlewares();
        this.routes();

        this.app.listen(this.port, () => {
            this.loggerAdapter.info(`Server listening on port ${ this.port }`);
        });
    }
}

export default Server;