export interface ProjectModel {
    userId: string;
    title: string;
    description?: string;
    url?: string;
    technologies?: string;
    startDate: Date | string;
    endDate?: Date | string;
}
