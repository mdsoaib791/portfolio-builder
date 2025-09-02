export interface ProjectDto {
    id: number;
    userId: string;
    title: string;
    description?: string | null;
    url?: string | null;
    technologies?: string | null;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface CreateProjectDto extends Omit<ProjectDto, 'id' | 'createdAt' | 'updatedAt'> { }

export interface UpdateProjectDto extends Partial<CreateProjectDto> { }
