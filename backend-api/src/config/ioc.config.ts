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

export default container;
