import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';

import { TYPES } from '@/config/types';
import { container } from '@/config/ioc';

import IHttpService from './interfaces/ihttp-service';
import IUserService from './interfaces/iuser-service';

import Response from '@/dtos/response-dto';
import { ListResponseDto } from '@/dtos/list-response-dto';
import { UserListParams } from '@/params/user.params';
import { UserDto } from '@/dtos/user-dto';
import { UserModel } from '@/models/user-model';

@injectable()
export default class UserService implements IUserService {
  private readonly httpService: IHttpService;

  constructor(httpService = container.get<IHttpService>(TYPES.IHttpService)) {
    this.httpService = httpService;
  }

  getAll(p: UserListParams): Promise<AxiosResponse<Response<ListResponseDto<UserDto>>>> {
    return this.httpService.call().get<ListResponseDto<UserDto>, AxiosResponse<Response<ListResponseDto<UserDto>>>>(`/user`, { params: p });
  }

  getById(id: string): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().get<UserDto, AxiosResponse<Response<UserDto>>>(`/user/${id}`);
  }

  getUserDetails(userId: string): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().get<UserDto, AxiosResponse<Response<UserDto>>>(`/User/GetUserDetails/${userId}`);
  }

  checkUserStatus(): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().get<UserDto, AxiosResponse<Response<UserDto>>>(`/User/CheckUserStatus`);
  }

  add(model: UserModel): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().post<UserDto, AxiosResponse<Response<UserDto>>>(`/user`, model);
  }

  update(id: number, model: UserModel): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().put<UserDto, AxiosResponse<Response<UserDto>>>(`/user/${id}`, model);
  }

  delete(id: number): Promise<AxiosResponse<Response<UserDto>>> {
    return this.httpService.call().delete<UserDto, AxiosResponse<Response<UserDto>>>(`/user/${id}`);
  }
}
