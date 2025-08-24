import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../../dtos/project.dto';

export interface IProjectRepository {
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ projects: ProjectDto[]; total: number; page: number; limit: number; totalPages: number }>;
  findById(id: string): Promise<ProjectDto | null>;
  create(data: CreateProjectDto): Promise<ProjectDto>;
  update(id: string, data: UpdateProjectDto): Promise<ProjectDto | null>;
  delete(id: string): Promise<ProjectDto | null>;
}
