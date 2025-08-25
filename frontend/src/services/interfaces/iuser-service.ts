import Response from '@/dtos/response-dto';
import { UserDto } from '@/dtos/user-dto';
import { AxiosResponse } from 'axios';

export default interface IUserService {
  get(q?: string): Promise<AxiosResponse<Response<UserDto[]>>>;
  getUserDetails(userId: string): Promise<AxiosResponse<Response<UserDto>>>;
  checkUserStatus(): Promise<AxiosResponse<Response<UserDto>>>;
}
