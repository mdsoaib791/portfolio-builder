export interface UserDto {
  id: number;
  userId: string;
  userName: string;
  email: string;
  fullName: string;
  roleName: string;
  profilePicture: string | null;
  phoneNumber: string | null;
  token: string | null;
  isActive: boolean;
  isDelete: boolean;
  userType: string | null;
  timezoneId: string | null;
}
