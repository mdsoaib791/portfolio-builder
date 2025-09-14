
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import type { IPortfolioService } from './interfaces/iportfolio.service';
import type { IProjectService } from './interfaces/iproject.service';
import type { ISkillService } from './interfaces/iskill.service';
import IUnitOfService from './interfaces/iunitof.service';
import type { IUserService } from './interfaces/iuser.service';
import type { IWorkExperienceService } from './interfaces/iwork-experience.service';

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Project: IProjectService;
  public Skill: ISkillService;
  public WorkExperience: IWorkExperienceService;
  public Portfolio: IPortfolioService;

  constructor(
    user: IUserService = container.get<IUserService>(TYPES.IUserService),
    project: IProjectService = container.get<IProjectService>(TYPES.IProjectService),
    skill: ISkillService = container.get<ISkillService>(TYPES.ISkillService),
    workExperience: IWorkExperienceService = container.get<IWorkExperienceService>(TYPES.IWorkExperienceService),
    portfolio: IPortfolioService = container.get<IPortfolioService>(TYPES.IPortfolioService)
  ) {
    this.User = user;
    this.Project = project;
    this.Skill = skill;
    this.WorkExperience = workExperience;
    this.Portfolio = portfolio;
  }
}
