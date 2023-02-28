"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
/* Routes */
const routes_1 = __importDefault(require("../notifications/routes"));
const server = (0, express_1.default)();
/* Aply cors and json of server */
server.use((0, cors_1.default)());
server.use(express_1.default.json());
/* Define routes */
server.use('/api', routes_1.default);
exports.default = server;
//# sourceMappingURL=index.js.map