import { Router } from 'express';

/* Actions */
import { reportNotification, revisitsNotification, coursesNotification } from '../actions';

const router = Router();

/* This is a route that is called when the user navigates to the /notifications route. */
router.get('/notifications', async (_, res) => {
    await reportNotification(res);
    await revisitsNotification(res);
    await coursesNotification(res);

    return res.status(200).json({
        msg: 'Notifications sent successfully',
        status: 200
    });
});

export default router;