import 'module-alias/register';
import './paths';

import { loggerAdapter } from '@config/di';
import { Server } from '@server';

const server = new Server(loggerAdapter);
server.listen();