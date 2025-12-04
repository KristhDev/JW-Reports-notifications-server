import express, { Application } from 'express';
import cors from 'cors';

/* Environment */
import { env } from '@config/env';

/* Contracts */
import { LoggerAdapterContract } from '@domain/contracts/adapters';

/* Middlewares */
import { VerifyCronToken } from '@crons/middlewares';
import { LogRequestsMiddleware } from './middlewares/logs';
import { ValidateRequestMiddleware } from './middlewares/validations';

/* Routes */
import { notificationsRouter } from '@notifications/routes';

class Server {
    private port: number = Number(env.APP_PORT || 9000);
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
        const verifyCronToken = new VerifyCronToken();
        const logRequestsMiddleware = new LogRequestsMiddleware(this.loggerAdapter);
        const validateRequestMiddleware = new ValidateRequestMiddleware();

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use((req, res, next) => logRequestsMiddleware.handle(req, res, next));
        this.app.use((req, res, next) => validateRequestMiddleware.handle(req, res, next));
        this.app.use((req, res, next) => verifyCronToken.handle(req, res, next));
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