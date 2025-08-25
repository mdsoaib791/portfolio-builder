import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from './types';

import IHttpService from '@/services/interfaces/ihttp-service';
import IUnitOfService from '@/services/interfaces/Iunit-of-service';
import IAccountService from '@/services/interfaces/iaccount-service';
import IDateTimeService from '@/services/interfaces/idatetime-service';
import IMiscellaneousService from '@/services/interfaces/imiscellaneous-service';
import IErrorHandlerService from '@/services/interfaces/ierror-handler-service';
import IUserService from '@/services/interfaces/iuser-service';

import HttpService from '@/services/http-service';
import UnitOfService from '@/services/unit-of-service';
import AccountService from '@/services/account-service';
import DateTimeService from '@/services/datetime-service';
import MiscellaneousService from '@/services/miscellaneous-service';
import ErrorHandlerService from '@/services/error-handler-service';
import UserService from '@/services/user-service';

const container = new Container();

container.bind<IHttpService>(TYPES.IHttpService).to(HttpService);
container.bind<IUnitOfService>(TYPES.IUnitOfService).to(UnitOfService);
container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
container.bind<IDateTimeService>(TYPES.IDateTimeService).to(DateTimeService);
container.bind<IMiscellaneousService>(TYPES.IMiscellaneousService).to(MiscellaneousService);
container.bind<IErrorHandlerService>(TYPES.IErrorHandlerService).to(ErrorHandlerService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

export { container };
