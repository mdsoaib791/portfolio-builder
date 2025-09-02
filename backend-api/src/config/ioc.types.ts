export const TYPES = {
  // Controllers
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),
  SkillController: Symbol.for('SkillController'),
  ProjectController: Symbol.for('ProjectController'),
  WorkExperienceController: Symbol.for('WorkExperienceController'),

  // Services
  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),
  IWorkExperienceService: Symbol.for('IWorkExperienceService'),
  ISkillService: Symbol.for('ISkillService'),
  IProjectService: Symbol.for('IProjectService'),

  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),
  IWorkExperienceRepository: Symbol.for('IWorkExperienceRepository'),
  ISkillRepository: Symbol.for('ISkillRepository'),
  IProjectRepository: Symbol.for('IProjectRepository'),

  // Unit of Work
  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUnitOfWorkWorkExperience: Symbol.for('IUnitOfWorkWorkExperience'),
};
