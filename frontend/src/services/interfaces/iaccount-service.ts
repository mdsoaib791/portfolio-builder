import { AxiosResponse } from 'axios';
import PlainDto from '@/dtos/plain-dto';
import LoginModel from '@/models/login-model';
import Response from '@/dtos/response-dto';
import { ChangePasswordModel } from '@/models/change-password-model';
import { LoginDto } from '@/dtos/login-dto';

export default interface IAccountService {
  login(model: LoginModel): Promise<AxiosResponse<Response<LoginDto>>>;
  changePassword(model: ChangePasswordModel): Promise<AxiosResponse<Response<PlainDto>>>;
}
