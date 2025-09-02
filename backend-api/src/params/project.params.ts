export interface ProjectFilterParams {
    userId?: string;
    title?: string;
    technologies?: string;
    startDate?: Date;
    endDate?: Date;
    search?: string; // Search in title or technologies
}
