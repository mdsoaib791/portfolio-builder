import { PaginationParams } from './pagination.params';

export interface UserListParams extends PaginationParams {
    userId?: string;
    userName?: string;
    email?: string;
    fullName?: string;
    roleName?: string;
    isActive?: boolean;
    userType?: string;
}
