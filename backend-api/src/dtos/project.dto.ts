

export interface ProjectDto {
  id: number;
  userId: string;
  title: string;
  description?: string;
  url?: string;
  technologies?: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDto extends Omit<ProjectDto, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateProjectDto extends Partial<CreateProjectDto> { }
