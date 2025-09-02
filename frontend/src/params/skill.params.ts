import { PaginationParams } from './pagination.params';

export interface SkillListParams extends PaginationParams {
    userId?: string;
    name?: string;
    level?: string;
}
