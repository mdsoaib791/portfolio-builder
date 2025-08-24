import { CreateProjectModel, Project, UpdateProjectModel } from '../../models/project.model';

export interface IProjectRepository {
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ projects: Project[]; total: number; page: number; limit: number; totalPages: number }>;
  findById(id: string): Promise<Project | null>;
  create(data: CreateProjectModel): Promise<Project>;
  update(id: string, data: UpdateProjectModel): Promise<Project | null>;
  delete(id: string): Promise<Project | null>;
}
