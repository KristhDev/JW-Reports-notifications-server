import { Router } from 'express';

/* Server */
import { Http, JsonResponse } from '../../server';

/* Actions */
import { PreachingNotifications, RevisitsNotifications, CoursesNotifications } from '../actions';

const router = Router();

/* This is a route that is called when the user navigates to the /notifications route. */
router.get('/notifications', async (_, res): Promise<JsonResponse> => {
    try {
        await PreachingNotifications.rememberReport(res);
        await RevisitsNotifications.daylyRevisits(res);
        await CoursesNotifications.daylyCourses(res);

        return Http.sendResp('Notifications sent successfully', Http.OK, res);
    } 
    catch (error) {
        return Http.internalServerError(res);
    }
});

export default router;