import express from 'express';
import cors from 'cors';

/* Routes */
import notifactionsRoutes from '../notifications/routes';

const server = express();

/* Aply cors and json of server */
server.use(cors());
server.use(express.json());

/* Define routes */
server.use('/api', notifactionsRoutes);

export default server;