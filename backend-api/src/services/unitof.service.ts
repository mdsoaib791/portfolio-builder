import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { IProjectService } from './interfaces/iproject.service';
import { ISkillService } from './interfaces/iskill.service';
import IUnitOfService from './interfaces/iunitof.service';
import { IUserService } from './interfaces/iuser.service';
import { IWorkExperienceService } from './interfaces/iwork-experience.service';

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Project: IProjectService;
  public Skill: ISkillService;
  public WorkExperience: IWorkExperienceService;

  constructor(
    user = container.get<IUserService>(TYPES.IUserService),
    project = container.get<IProjectService>(TYPES.IProjectService),
    skill = container.get<ISkillService>(TYPES.ISkillService),
    workExperience = container.get<IWorkExperienceService>(TYPES.IWorkExperienceService)
  ) {
    this.User = user;
    this.Project = project;
    this.Skill = skill;
    this.WorkExperience = workExperience;
  }
}
