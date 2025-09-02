import { injectable } from 'inversify';
import { TYPES } from '@/config/types';
import { container } from '@/config/ioc';

import IUnitOfService from './interfaces/Iunit-of-service';
import IHttpService from './interfaces/ihttp-service';
import IAccountService from './interfaces/iaccount-service';
import IDateTimeService from './interfaces/idatetime-service';
import IMiscellaneousService from './interfaces/imiscellaneous-service';
import IErrorHandlerService from './interfaces/ierror-handler-service';
import IUserService from './interfaces/iuser-service';
import IWorkExperienceService from './interfaces/iwork-experience-service';
import ISkillService from './interfaces/iskill-service';
import IProjectService from './interfaces/iproject-service';

@injectable()
export default class UnitOfService implements IUnitOfService {
  public HttpService: IHttpService;
  public AccountService: IAccountService;
  public DateTimeService: IDateTimeService;
  public MiscellaneousService: IMiscellaneousService;
  public ErrorHandlerService: IErrorHandlerService;
  public UserService: IUserService;
  public WorkExperienceService: IWorkExperienceService;
  public SkillService: ISkillService;
  public ProjectService: IProjectService;

  constructor(
    httpService = container.get<IHttpService>(TYPES.IHttpService),
    accountService = container.get<IAccountService>(TYPES.IAccountService),
    dateTimeService = container.get<IDateTimeService>(TYPES.IDateTimeService),
    miscellaneousService = container.get<IMiscellaneousService>(TYPES.IMiscellaneousService),
    errorHandlerService = container.get<IErrorHandlerService>(TYPES.IErrorHandlerService),
    userService = container.get<IUserService>(TYPES.IUserService),
    workExperienceService = container.get<IWorkExperienceService>(TYPES.IWorkExperienceService),
    skillService = container.get<ISkillService>(TYPES.ISkillService),
    projectService = container.get<IProjectService>(TYPES.IProjectService)
  ) {
    this.HttpService = httpService;
    this.AccountService = accountService;
    this.DateTimeService = dateTimeService;
    this.MiscellaneousService = miscellaneousService;
    this.ErrorHandlerService = errorHandlerService;
    this.UserService = userService;
    this.WorkExperienceService = workExperienceService;
    this.SkillService = skillService;
    this.ProjectService = projectService;
  }
}
