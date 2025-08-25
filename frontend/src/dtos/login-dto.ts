import { UserDto } from './user-dto';

export interface LoginDto {
  token: string | null;
  tokenExpiryDate: Date;
  refreshToken: string | null;
  user: UserDto;
}
