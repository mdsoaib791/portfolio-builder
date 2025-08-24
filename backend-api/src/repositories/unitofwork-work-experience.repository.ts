import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfWorkWorkExperience from './interfaces/iunitofwork-work-experience.repository';
import { IWorkExperienceRepository } from './interfaces/iwork-experience.repository';

export default class UnitOfWorkWorkExperience implements IUnitOfWorkWorkExperience {
  public WorkExperience: IWorkExperienceRepository;
  constructor(workExperience?: IWorkExperienceRepository) {
    this.WorkExperience = workExperience || container.get<IWorkExperienceRepository>(TYPES.IWorkExperienceRepository);
  }
}
