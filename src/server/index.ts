import express from 'express';
import cors from 'cors';

/* Middlewares */
import { authCheck } from '../auth/middlewares';

/* Routes */
import notifactionsRoutes from '../notifications/routes';

const server = express();

/* Aply cors and json of server */
server.use(cors());
server.use(express.json());

/* Apply middlewares */
server.use(authCheck);

/* Define routes */
server.use('/api', notifactionsRoutes);

export default server;