import { ListResponseDto } from '@/dtos/list-response-dto';
import Response from '@/dtos/response-dto';
import { UserDto } from '@/dtos/user-dto';
import { UserModel } from '@/models/user-model';
import { UserListParams } from '@/params/user.params';
import { AxiosResponse } from 'axios';

export default interface IUserService {
  getAll(p: UserListParams): Promise<AxiosResponse<Response<ListResponseDto<UserDto>>>>;
  getById(id: string): Promise<AxiosResponse<Response<UserDto>>>;
  getUserDetails(userId: string): Promise<AxiosResponse<Response<UserDto>>>;
  checkUserStatus(): Promise<AxiosResponse<Response<UserDto>>>;
  add(model: UserModel): Promise<AxiosResponse<Response<UserDto>>>;
  update(id: number, model: UserModel): Promise<AxiosResponse<Response<UserDto>>>;
  delete(id: number): Promise<AxiosResponse<Response<UserDto>>>;
}
