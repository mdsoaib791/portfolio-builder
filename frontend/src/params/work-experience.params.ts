import { PaginationParams } from './pagination.params';

export interface WorkExperienceListParams extends PaginationParams {
    userId?: string;
    companyName?: string;
    position?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
}