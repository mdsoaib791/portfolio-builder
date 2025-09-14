import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';

import IAccountService from './interfaces/iaccount-service';
import IHttpService from './interfaces/ihttp-service';
import LoginModel from '@/models/login-model';
import CreateUserModel from '@/models/create-user-model';

import { LoginDto } from '@/dtos/login-dto';
import Response from '@/dtos/response-dto';

@injectable()
export default class AccountService implements IAccountService {
  private readonly httpService: IHttpService;
  constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
    this.httpService = httpService;
  }

  login(model: LoginModel): Promise<AxiosResponse<Response<LoginDto>>> {
    return this.httpService.callWithoutInterceptor().post<LoginDto, AxiosResponse<Response<LoginDto>>>('/auth/login', model);
  }

  register(model: CreateUserModel): Promise<AxiosResponse<Response<any>>> {
    return this.httpService.callWithoutInterceptor().post<any, AxiosResponse<Response<any>>>('/auth/register', model);
  }
}
