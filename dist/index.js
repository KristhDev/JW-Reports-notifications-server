"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = require("node-cron");
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(utc_1.default);
/* Notifications */
const notifications_1 = require("./src/notifications");
dotenv_1.default.config();
/* A cron job that runs every day at 6:00 AM. */
(0, node_cron_1.schedule)('0 6 * * *', () => {
    (0, notifications_1.reportNotification)();
    (0, notifications_1.revisitsNotification)();
    (0, notifications_1.coursesNotification)();
}, { timezone: 'America/Managua' });
//# sourceMappingURL=index.js.map