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
exports.coursesNotification = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
/* Supabase */
const supabase_1 = require("../../supabase");
/* Utils */
const utils_1 = require("../../utils");
/**
 * It gets all the courses that are not done, not suspended, not finished, and that have a next lesson
 * today, and then sends a notification to the users who have those courses.
 * @param {Response} res - Response - This is the response object from the express server.
 * @returns An array of objects.
 */
const coursesNotification = (res) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, dayjs_1.default)().tz('America/Managua').format('YYYY-MM-DD');
    const { data, error, status } = yield supabase_1.supabase.from('lessons')
        .select('courses (user_id)')
        .eq('done', false)
        .eq('courses.suspended', false)
        .eq('courses.finished', false)
        .gte('next_lesson', `${now} 00:00`)
        .lte('next_lesson', `${now} 23:59`);
    if (error) {
        console.log(error);
        return res.status(status).json({
            msg: error.message,
            status: status
        });
    }
    if (data.length === 0) {
        const hour = (0, dayjs_1.default)().tz('America/Managua');
        console.log(`${hour.format('HH:mm:ss')} There are no courses for today.`);
        return;
    }
    const arrayIds = new Set(data.map(({ courses }) => (Array.isArray(courses)) ? courses[0].user_id : courses.user_id));
    const userIds = [...arrayIds];
    const notification = {
        contents: {
            en: 'Tienes cursos que dar hoy, entra y ve quienes son.'
        },
        headings: {
            en: 'Cursos bíblicos',
        },
        include_external_user_ids: userIds,
    };
    (0, utils_1.sendNotification)(notification).then(() => {
        const hour = (0, dayjs_1.default)().tz('America/Managua');
        console.log(`${hour.format('HH:mm:ss')} Courses notifications sent.`);
    });
});
exports.coursesNotification = coursesNotification;
//# sourceMappingURL=courses.js.map