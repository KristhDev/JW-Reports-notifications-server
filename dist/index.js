"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const server_1 = __importDefault(require("./src/server"));
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(utc_1.default);
dotenv_1.default.config();
server_1.default.listen(process.env.PORT);
console.log(`Server running on port ${process.env.PORT}`);
//# sourceMappingURL=index.js.map