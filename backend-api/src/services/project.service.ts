import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { IProjectRepository } from '../repositories/interfaces/iproject.repository';
import { IProjectService } from './interfaces/iproject.service';

@injectable()
export class ProjectService implements IProjectService {
  constructor(@inject(TYPES.IProjectRepository) private projectRepository: IProjectRepository) { }

  async findById(id: string): Promise<ProjectDto | null> {
    return this.projectRepository.findById(id);
  }

  async findAll(
    filters?: any,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ) {
    return this.projectRepository.findAll(filters, page, limit, sortBy, sortOrder);
  }

  async create(data: CreateProjectDto): Promise<ProjectDto | null> {
    return this.projectRepository.create(data);
  }

  async update(id: string, data: UpdateProjectDto): Promise<ProjectDto | null> {
    return this.projectRepository.update(id, data);
  }

  async delete(id: string): Promise<ProjectDto | null> {
    return this.projectRepository.delete(id);
  }
}
