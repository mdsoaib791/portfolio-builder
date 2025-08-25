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

@injectable()
export default class UnitOfService implements IUnitOfService {
  public HttpService: IHttpService;
  public AccountService: IAccountService;
  public DateTimeService: IDateTimeService;
  public MiscellaneousService: IMiscellaneousService;
  public ErrorHandlerService: IErrorHandlerService;
  public UserService: IUserService;

  constructor(
    httpService = container.get<IHttpService>(TYPES.IHttpService),
    accountService = container.get<IAccountService>(TYPES.IAccountService),
    dateTimeService = container.get<IDateTimeService>(TYPES.IDateTimeService),
    miscellaneousService = container.get<IMiscellaneousService>(TYPES.IMiscellaneousService),
    errorHandlerService = container.get<IErrorHandlerService>(TYPES.IErrorHandlerService),
    userService = container.get<IUserService>(TYPES.IUserService)
  ) {
    this.HttpService = httpService;
    this.AccountService = accountService;
    this.DateTimeService = dateTimeService;
    this.MiscellaneousService = miscellaneousService;
    this.ErrorHandlerService = errorHandlerService;
    this.UserService = userService;
  }
}
