import express, { Application } from 'express';
import cors from 'cors';

/* Middlewares */
import { authCheck } from '../auth/middlewares';

/* Routes */
import { router as notifactionsRouter } from '../notifications';

class Server {
    private port: number = Number(process.env.PORT || 9000);
    private app: Application = express();

    /**
     * Initializes the middlewares for the Express app.
     *
     * This function adds the necessary middleware functions to the app.
     * The middlewares added are:
     * - cors: handles Cross-Origin Resource Sharing
     * - express.json: parses incoming JSON requests
     * - authCheck: handles authentication checks
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(authCheck);
    }

    /**
     * Defines the routes for the application.
     *
     * @private
     * @returns {void} - No return value
     */
    private routes(): void {
        this.app.use('/api', notifactionsRouter);
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
            console.log(`Server running on port ${ this.port }`);
        });
    }
}

export default Server;