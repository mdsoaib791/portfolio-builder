import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { CreateProjectModel, Project, UpdateProjectModel } from '../models/project.model';
import { IProjectRepository } from '../repositories/interfaces/iproject.repository';
import { IProjectService } from './interfaces/iproject.service';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';

@injectable()
export class ProjectService implements IProjectService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async findById(id: number): Promise<Project | null> {
    return this.unitOfWork.Project.findById(id);
  }

  async findAll(
    filters?: any,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ) {
    return this.unitOfWork.Project.findAll(filters, page, limit, sortBy, sortOrder);
  }

  async create(data: CreateProjectModel): Promise<Project | null> {
    return this.unitOfWork.Project.create(data);
  }

  async update(id: number, data: UpdateProjectModel): Promise<Project | null> {
    return this.unitOfWork.Project.update(id, data);
  }

  async delete(id: number): Promise<Project | null> {
    return this.unitOfWork.Project.delete(id);
  }
}
