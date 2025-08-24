
export interface WorkExperienceDto {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
  location?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkExperienceDto extends Omit<WorkExperienceDto, 'id' | 'createdAt' | 'updatedAt'> { }

export interface UpdateWorkExperienceDto extends Partial<CreateWorkExperienceDto> { }
