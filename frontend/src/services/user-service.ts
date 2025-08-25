import { injectable } from 'inversify';
import { TYPES } from '@/config/types';
import { AxiosResponse } from 'axios';
import IUserService from './interfaces/iuser-service';
import IHttpService from './interfaces/ihttp-service';
import { container } from '@/config/ioc';
import Response from '@/dtos/response-dto';
import { UserDto } from '@/dtos/user-dto';

@injectable()
export default class UserService implements IUserService {
  private readonly httpService: IHttpService;
  constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
    this.httpService = httpService;
  }

  get(q?: string): Promise<AxiosResponse<Response<UserDto[]>>> {
    return this.httpService.call().get<UserDto[], AxiosResponse<Response<UserDto[]>>>(`/User?q=${q || ''}`);
  }

  getUserDetails(userId: string): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().get<UserDto, AxiosResponse<Response<UserDto>>>(`/User/GetUserDetails/${userId}`);
  }

  checkUserStatus(): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().get<UserDto, AxiosResponse<Response<UserDto>>>(`/User/CheckUserStatus`);
  }
}
