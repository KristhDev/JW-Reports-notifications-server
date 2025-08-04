import { loggerAdapter } from './src/config/di';
import { Server } from './src/presentation/server';

const server = new Server(loggerAdapter);
server.listen();