import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import {
    notifyNewAppVersionUsecase,
    notifyUsersOfPendingLessonsUsecase,
    notifyUsersOfPendingRevisitsUsecase,
    notifyUsersToSendReportUsecase
} from '@config/di';

import { DailyNotificationsController, NewAppVersionNotificationController } from '../controllers';

import { validateRequest } from '@server/middlewares';

const notificationsRouter = Router();

const dailyNotificationsController = new DailyNotificationsController(
    notifyUsersToSendReportUsecase,
    notifyUsersOfPendingRevisitsUsecase,
    notifyUsersOfPendingLessonsUsecase,
);

const newAppVersionNotificationController = new NewAppVersionNotificationController(notifyNewAppVersionUsecase);

notificationsRouter.get('/daily', (req: Request, res: Response) => dailyNotificationsController.handle(req, res));

notificationsRouter.post('/new-version', [
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
], (req: Request, res: Response) => newAppVersionNotificationController.handle(req, res));

export default notificationsRouter;