"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportNotification = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
/* Supabase */
const supabase_1 = require("../supabase");
/* Utils */
const utils_1 = require("../utils");
/**
 * It checks if the current day is the last day of the month, if it is, it gets all the tokens from the
 * database and sends a notification to all of them.
 * @returns a promise.
 */
const reportNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, dayjs_1.default)().tz('America/Managua');
    const currentDay = now.get('D');
    const lastDay = now.endOf('month').get('D');
    if (currentDay === lastDay) {
        const { data, error } = yield supabase_1.supabase.auth.admin.listUsers();
        if (error) {
            console.log(error);
            return;
        }
        const userIds = data.users.map(({ id }) => id);
        const notification = {
            contents: {
                en: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe.',
            },
            headings: {
                en: 'Entrega de informe',
            },
            include_external_user_ids: userIds,
        };
        (0, utils_1.sendNotification)(notification).then(() => {
            const hour = (0, dayjs_1.default)().tz('America/Managua');
            console.log(`${hour.format('HH:mm:ss')} Report notification sent.`);
        });
    }
    else {
        const hour = (0, dayjs_1.default)().tz('America/Managua');
        console.log(`${hour.format('HH:mm:ss')} Reports are not due yet.`);
    }
});
exports.reportNotification = reportNotification;
//# sourceMappingURL=preaching.js.map