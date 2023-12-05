import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';

/* Server */
import { Http, JsonResponse, Logger, validateRequest } from '../../server';

/* Actions */
import { PreachingNotifications, RevisitsNotifications, CoursesNotifications, ApplicationNotifications } from '../actions';

const router = Router();

/* This is a route that is called when the user navigates to the /notifications route. */
router.get('/daily', async (req, res): Promise<JsonResponse> => {
    try {
        await PreachingNotifications.rememberReport(res);
        await RevisitsNotifications.dailyRevisits(res);
        await CoursesNotifications.dailyCourses(res);

        return Http.sendResp('Notifications sent successfully', Http.OK, res);
    } 
    catch (error) {
        const userAgent = (req.useragent?.browser !== 'unknown') 
            ? `${ req.useragent?.browser } ${ req.useragent?.version } ${ req.useragent?.os } ${ req.useragent?.platform }` 
            : req.useragent?.source;

        const message = `${ req.method } ${ req.originalUrl } IP ${ req.ip } ${ userAgent } Status 500 ${ (error as any).message }`;
        await Logger.error(message);

        return Http.internalServerError(res);
    }
});

/* This is a route that is called when the user navigates to the /notifications route. */
router.post('/new-version', [ 

    check('version')
        .trim()
        .escape()
        .notEmpty().withMessage('La versión no puede estar vacía'),
    (req: Request, res: Response, next: NextFunction) => validateRequest(req, res, next),

    check('launchUrl')
        .trim()
        .notEmpty().withMessage('La url de lanzamiento no puede estar vacía')
        .isURL().withMessage('La url de lanzamiento debe ser una dirección URL'),
    (req: Request, res: Response, next: NextFunction) => validateRequest(req, res, next),
], 
    async (req: Request, res: Response): Promise<JsonResponse> => {
        try {
            await ApplicationNotifications.newVersion(req, res);
            return Http.sendResp('New app version notification sent successfully', Http.OK, res);
        } 
        catch (error) {
            const userAgent = (req.useragent?.browser !== 'unknown') 
                ? `${ req.useragent?.browser } ${ req.useragent?.version } ${ req.useragent?.os } ${ req.useragent?.platform }` 
                : req.useragent?.source;

            const message = `${ req.method } ${ req.originalUrl } IP ${ req.ip } ${ userAgent } Status 500 ${ (error as any).message }`;
            await Logger.error(message);

            return Http.internalServerError(res);
        }
    }
);

export default router;