import { HttpClientAdapterContract, LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';
import { CoursesDatasourceContract, RevisitsDatasourceContract, UsersDatasourceContract } from '@domain/contracts/datasources';
import { NotificationsServiceContract } from '@domain/contracts/services';
import { AppFacadeContract, CoursesFacadeContract, PreachingFacadeContract, RevisitsFacadeContract } from '@domain/contracts/facades';
import { NotifyUsersWithNewAppVersionUsecaseContract } from '@domain/contracts/usecases/app';
import { NotifyUsersToSendReportUsecaseContract } from '@domain/contracts/usecases/preaching';
import { NotifyUsersOfPendingLessonsUsecaseContract } from '@domain/contracts/usecases/courses';
import { NotifyUsersOfPendingRevisitsUsecaseContract } from '@domain/contracts/usecases/revisits';

import { HttpClientAdapter, LoggerAdapter, TimeAdapter } from '@infrastructure/adapters';
import { CoursesDatasource, RevisitsDatasource, UsersDatasource } from '@infrastructure/datasources';
import { AppFacade, CoursesFacade, PreachingFacade, RevisitsFacade } from '@application/facades';
import { NotificationsService } from '@infrastructure/services';
import { NotifyUsersWithNewAppVersionUseCase } from '@application/usecases/app';
import { NotifyUsersToSendReportUseCase } from '@application/usecases/preaching';
import { NotifyUsersOfPendingLessonsUseCase } from '@application/usecases/courses';
import { NotifyUsersOfPendingRevisitsUsecase } from '@application/usecases/revisits';

export const timeAdapter: TimeAdapterContract = new TimeAdapter({ timezone: 'America/Managua' });

export const loggerAdapter: LoggerAdapterContract = new LoggerAdapter(timeAdapter, {
    renderLogsInConsole: true,
    writeLogsInFile: true
});

export const httpClientAdapter: HttpClientAdapterContract = new HttpClientAdapter(loggerAdapter);

export const coursesDatasource: CoursesDatasourceContract = new CoursesDatasource(timeAdapter);
export const revisitsDatasource: RevisitsDatasourceContract = new RevisitsDatasource(timeAdapter);
export const usersDatasource: UsersDatasourceContract = new UsersDatasource();

export const notificationsService: NotificationsServiceContract = new NotificationsService(httpClientAdapter);

export const appFacade: AppFacadeContract = new AppFacade(timeAdapter, loggerAdapter, usersDatasource, notificationsService);
export const coursesFacade: CoursesFacadeContract = new CoursesFacade(timeAdapter, loggerAdapter, coursesDatasource, notificationsService);
export const preachingFacade: PreachingFacadeContract = new PreachingFacade(timeAdapter, loggerAdapter, usersDatasource, notificationsService);
export const revisitsFacade: RevisitsFacadeContract = new RevisitsFacade(timeAdapter, loggerAdapter, revisitsDatasource, notificationsService);

export const notifyNewAppVersionUsecase: NotifyUsersWithNewAppVersionUsecaseContract = new NotifyUsersWithNewAppVersionUseCase(appFacade);
export const notifyUsersOfPendingLessonsUsecase: NotifyUsersOfPendingLessonsUsecaseContract = new NotifyUsersOfPendingLessonsUseCase(coursesFacade);
export const notifyUsersOfPendingRevisitsUsecase: NotifyUsersOfPendingRevisitsUsecaseContract = new NotifyUsersOfPendingRevisitsUsecase(revisitsFacade);
export const notifyUsersToSendReportUsecase: NotifyUsersToSendReportUsecaseContract = new NotifyUsersToSendReportUseCase(preachingFacade);