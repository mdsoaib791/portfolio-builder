import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../../dtos/project.dto';

export interface IProjectService {
  findById(id: string): Promise<ProjectDto | null>;
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ projects: ProjectDto[]; total: number; page: number; limit: number; totalPages: number }>;
  create(data: CreateProjectDto): Promise<ProjectDto | null>;
  update(id: string, data: UpdateProjectDto): Promise<ProjectDto | null>;
  delete(id: string): Promise<ProjectDto | null>;
}
