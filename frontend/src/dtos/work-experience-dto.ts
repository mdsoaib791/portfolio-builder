export interface WorkExperienceDto {
    id: number;
    userId: string;
    companyName: string;
    position: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    description?: string | null;
    location?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface CreateWorkExperienceDto extends Omit<WorkExperienceDto, 'id' | 'createdAt' | 'updatedAt'> { }

export interface UpdateWorkExperienceDto extends Partial<CreateWorkExperienceDto> { }
