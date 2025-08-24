export const TYPES = {
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),

  SkillController: Symbol.for('SkillController'),
  ProjectController: Symbol.for('ProjectController'),

  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),

  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUserRepository: Symbol.for('IUserRepository'),
  WorkExperienceController: Symbol.for('WorkExperienceController'),
  IWorkExperienceService: Symbol.for('IWorkExperienceService'),
  IWorkExperienceRepository: Symbol.for('IWorkExperienceRepository'),
  IUnitOfWorkWorkExperience: Symbol.for('IUnitOfWorkWorkExperience'),
  ISkillRepository: Symbol.for('ISkillRepository'),
  ISkillService: Symbol.for('ISkillService'),
  IProjectRepository: Symbol.for('IProjectRepository'),
  IProjectService: Symbol.for('IProjectService'),
};
