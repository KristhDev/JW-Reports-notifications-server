import { Request, Response } from 'express';

/* Dtos */
import { AppNewVersionDto } from '@domain/dtos/app';

/* Contracts */
import { NotifyUsersWithNewAppVersionUsecaseContract } from '@domain/contracts/usecases/app';

/* Controllers */
import { BaseController } from '@server/controllers';

export class NewAppVersionNotificationController extends BaseController {
    constructor(
        private readonly notifyUsersWithNewAppVersionUsecase: NotifyUsersWithNewAppVersionUsecaseContract,
    ) {
        super();
    }

    /**
     * Handles the request to send a new app version notification.
     *
     * @param {Request} req - The express request object containing the new version data.
     * @param {Response} res - The express response object to send the response.
     * @returns {Promise<void>} A promise that resolves when the notification process is complete.
     */
    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const dto = AppNewVersionDto.fromRequest(req.body);
            await this.notifyUsersWithNewAppVersionUsecase.execute(dto);

            this.jsonResponse.success(res, { message: 'New app version notification sent successfully' });
        } 
        catch (error) {
            this.jsonResponse.internalServerError(res);
        }
    }
}