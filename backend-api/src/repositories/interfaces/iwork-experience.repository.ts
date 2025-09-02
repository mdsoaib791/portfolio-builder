import { CreateWorkExperienceDto, UpdateWorkExperienceDto, WorkExperienceDto } from '../../dtos/work-experience.dto';
import { WorkExperienceFilterParams } from '../../params/work-experience.params';

export interface IWorkExperienceRepository {
  findAll(
    filters?: WorkExperienceFilterParams,
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
  findById(id: number): Promise<WorkExperienceDto | null>;
  create(data: CreateWorkExperienceDto): Promise<WorkExperienceDto>;
  update(id: number, data: UpdateWorkExperienceDto): Promise<WorkExperienceDto>;
  delete(id: number): Promise<WorkExperienceDto>;
}
