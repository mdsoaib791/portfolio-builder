import { CreateProjectModel, Project, UpdateProjectModel } from '../../models/project.model';
import { ProjectFilterParams } from '../../params/project.params';

export interface IProjectRepository {
  findAll(filters?: ProjectFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ projects: Project[]; total: number; page: number; limit: number; totalPages: number }>;
  findById(id: number): Promise<Project | null>;
  create(data: CreateProjectModel): Promise<Project>;
  update(id: number, data: UpdateProjectModel): Promise<Project | null>;
  delete(id: number): Promise<Project | null>;
}
