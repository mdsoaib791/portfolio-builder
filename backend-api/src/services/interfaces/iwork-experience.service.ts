import { UpdateWorkExperienceDto, WorkExperienceDto } from '../../dtos/work-experience.dto';
import { CreateWorkExperienceModel } from '../../models/work-experience.model';

export interface IWorkExperienceService {
  findById(id: string): Promise<WorkExperienceDto | null>;
  findAll(
    filters?: any,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ): Promise<{
    workExperiences: WorkExperienceDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  create(data: CreateWorkExperienceModel): Promise<WorkExperienceDto | null>;
  update(id: string, data: UpdateWorkExperienceDto): Promise<WorkExperienceDto | null>;
  delete(id: string): Promise<WorkExperienceDto | null>;
}
