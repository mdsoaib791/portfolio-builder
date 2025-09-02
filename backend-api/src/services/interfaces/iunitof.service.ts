import { IProjectService } from './iproject.service';
import { ISkillService } from './iskill.service';
import { IUserService } from './iuser.service';
import { IWorkExperienceService } from './iwork-experience.service';

export default interface IUnitOfService {
  User: IUserService;
  Project: IProjectService;
  Skill: ISkillService;
  WorkExperience: IWorkExperienceService;
}
