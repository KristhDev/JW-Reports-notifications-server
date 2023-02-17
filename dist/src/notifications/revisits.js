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
exports.revisitsNotification = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
/* Supabase */
const supabase_1 = require("../supabase");
/* Utils */
const utils_1 = require("../utils");
/**
 * It gets all the revisits that are not done and that have a next_visit date between today's date and
 * today's date.
 *
 * Then it gets all the user_ids from those revisits and sends a notification to all of them.
 * @returns a Promise.
 */
const revisitsNotification = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, dayjs_1.default)().tz('America/Managua').format('YYYY-MM-DD');
    const { data, error } = yield supabase_1.supabase.from('revisits')
        .select('user_id')
        .eq('done', false)
        .gte('next_visit', `${now} 00:00`)
        .lte('next_visit', `${now} 23:59`);
    if (error) {
        console.log(error);
        return;
    }
    if (data.length === 0) {
        const hour = (0, dayjs_1.default)().tz('America/Managua');
        console.log(`${hour.format('HH:mm:ss')} There are no revisits for today.`);
        return;
    }
    ;
    const arrayIds = new Set(data.map(({ user_id }) => user_id));
    const userIds = [...arrayIds];
    const notification = {
        contents: {
            en: 'Tienes revisitas para hoy, entra y ve cuáles son.'
        },
        headings: {
            en: 'Revisitas',
        },
        include_external_user_ids: userIds,
    };
    (0, utils_1.sendNotification)(notification).then(() => {
        const hour = (0, dayjs_1.default)().tz('America/Managua');
        console.log(`${hour.format('HH:mm:ss')} Revisits notifications sent.`);
    });
    ;
});
exports.revisitsNotification = revisitsNotification;
//# sourceMappingURL=revisits.js.map