import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { UpdateWorkExperienceDto, WorkExperienceDto } from '../dtos/work-experience.dto';
import { CreateWorkExperienceModel } from '../models/work-experience.model';

import { IWorkExperienceService } from './interfaces/iwork-experience.service';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';

@injectable()
export class WorkExperienceService implements IWorkExperienceService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async findById(id: number): Promise<WorkExperienceDto | null> {
    return this.unitOfWork.WorkExperience.findById(id);
  }

  async findAll(
    filters?: any,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ) {
    return this.unitOfWork.WorkExperience.findAll(filters, page, limit, sortBy, sortOrder);
  }

  async create(data: CreateWorkExperienceModel): Promise<WorkExperienceDto | null> {
    return this.unitOfWork.WorkExperience.create(data);
  }

  async update(id: number, data: UpdateWorkExperienceDto): Promise<WorkExperienceDto | null> {
    return this.unitOfWork.WorkExperience.update(id, data);
  }

  async delete(id: number): Promise<WorkExperienceDto | null> {
    return this.unitOfWork.WorkExperience.delete(id);
  }
}

export default WorkExperienceService;
