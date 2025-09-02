import { PaginationParams } from './pagination.params';

export interface ProjectListParams extends PaginationParams {
    userId?: string;
    title?: string;
    technologies?: string;
    startDate?: string;
    endDate?: string;
}
