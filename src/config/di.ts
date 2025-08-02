import { LoggerAdapterContract, TimeAdapterContract } from '../domain/contracts/adapters';
import { CoursesDatasourceContract } from '../domain/contracts/datasources';
import { CoursesFacadeContract } from '../domain/contracts/facades';
import { NotifyUsersWithPendingLessonsUsecaseContract } from '../domain/contracts/usecases/courses';

import { LoggerAdapter, TimeAdapter } from '../infrastructure/adapters';
import { CoursesDatasource } from '../infrastructure/datasources';
import { CoursesFacade } from '../application/facades';
import { NotifyUsersWithPendingLessonsUseCase } from '../application/usecases/courses';

export const timeAdapter: TimeAdapterContract = new TimeAdapter();
export const loggerAdapter: LoggerAdapterContract = new LoggerAdapter();

export const coursesService: CoursesDatasourceContract = new CoursesDatasource(timeAdapter);

export const coursesFacade: CoursesFacadeContract = new CoursesFacade(timeAdapter, loggerAdapter, coursesService);

export const notifyUsersWithPendingLessonsUsecase: NotifyUsersWithPendingLessonsUsecaseContract = new NotifyUsersWithPendingLessonsUseCase(coursesFacade);