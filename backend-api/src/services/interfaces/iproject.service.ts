import { CreateProjectModel, Project, UpdateProjectModel } from '../../models/project.model';

export interface IProjectService {
  findById(id: string): Promise<Project | null>;
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ projects: Project[]; total: number; page: number; limit: number; totalPages: number }>;
  create(data: CreateProjectModel): Promise<Project | null>;
  update(id: string, data: UpdateProjectModel): Promise<Project | null>;
  delete(id: string): Promise<Project | null>;
}
