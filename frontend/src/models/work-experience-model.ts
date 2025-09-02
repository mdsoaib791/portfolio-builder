export interface WorkExperienceModel {
    userId: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string | null;
    description?: string;
    location?: string;
}