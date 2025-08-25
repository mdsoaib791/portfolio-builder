import { container } from '@/config/ioc';
import { TYPES } from '@/config/types';
import { injectable } from 'inversify';

import { AxiosResponse } from 'axios';

import IAccountService from './interfaces/iaccount-service';
import IHttpService from './interfaces/ihttp-service';

import { ChangePasswordModel } from '@/models/change-password-model';
import LoginModel from '@/models/login-model';

import { LoginDto } from '@/dtos/login-dto';
import PlainDto from '@/dtos/plain-dto';
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

  changePassword(model: ChangePasswordModel): Promise<AxiosResponse<Response<PlainDto>>> {
    return this.httpService.call().post<PlainDto, AxiosResponse<Response<PlainDto>>>('/Account/ChangePassword', model);
  }
}
