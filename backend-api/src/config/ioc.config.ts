import { Container } from 'inversify';
import { TYPES } from './ioc.types';

import { AccountController } from '../controllers/account.controller';
import { HealthController } from '../controllers/health.controller';
import { UserController } from '../controllers/user.controller';
import { WorkExperienceController } from '../controllers/work-experience.controller';

import IUnitOfService from '../services/interfaces/iunitof.service';
import { IUserService } from '../services/interfaces/iuser.service';
import { IWorkExperienceService } from '../services/interfaces/iwork-experience.service';

import UnitOfService from '../services/unitof.service';
import { UserService } from '../services/user.service';
import WorkExperienceService from '../services/work-experience.service';

import IUnitOfWorkWorkExperience from '../repositories/interfaces/iunitofwork-work-experience.repository';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { IUserRepository } from '../repositories/interfaces/iuser.repository';
import { IWorkExperienceRepository } from '../repositories/interfaces/iwork-experience.repository';
import UnitOfWorkWorkExperience from '../repositories/unitofwork-work-experience.repository';
import UnitOfWork from '../repositories/unitofwork.repository';
import { UserRepository } from '../repositories/user.repository';
import { WorkExperienceRepository } from '../repositories/work-experience.repository';

import { ISkillRepository } from '../repositories/interfaces/iskill.repository';
import { SkillRepository } from '../repositories/skill.repository';
import { ISkillService } from '../services/interfaces/iskill.service';
import { SkillService } from '../services/skill.service';

import { IProjectRepository } from '../repositories/interfaces/iproject.repository';
import { ProjectRepository } from '../repositories/project.repository';
import { IProjectService } from '../services/interfaces/iproject.service';
import { ProjectService } from '../services/project.service';

import { ProjectController } from '../controllers/project.controller';
import { SkillController } from '../controllers/skill.controller';

const container = new Container();

container.bind<HealthController>(TYPES.HealthController).to(HealthController);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<WorkExperienceController>(TYPES.WorkExperienceController).to(WorkExperienceController);

container.bind<IUnitOfService>(TYPES.IUnitOfService).to(UnitOfService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IWorkExperienceService>(TYPES.IWorkExperienceService).to(WorkExperienceService);

container.bind<IUnitOfWork>(TYPES.IUnitOfWork).to(UnitOfWork);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IWorkExperienceRepository>(TYPES.IWorkExperienceRepository).to(WorkExperienceRepository);
container.bind<IUnitOfWorkWorkExperience>(TYPES.IUnitOfWorkWorkExperience).to(UnitOfWorkWorkExperience);

container.bind<SkillController>(TYPES.SkillController).to(SkillController);
container.bind<ProjectController>(TYPES.ProjectController).to(ProjectController);

container.bind<ISkillRepository>(TYPES.ISkillRepository).to(SkillRepository);
container.bind<ISkillService>(TYPES.ISkillService).to(SkillService);
container.bind<IProjectRepository>(TYPES.IProjectRepository).to(ProjectRepository);
container.bind<IProjectService>(TYPES.IProjectService).to(ProjectService);

export default container;
