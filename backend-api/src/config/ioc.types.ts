export const TYPES = {
  // Controllers
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),
  SkillController: Symbol.for('SkillController'),
  ProjectController: Symbol.for('ProjectController'),
  WorkExperienceController: Symbol.for('WorkExperienceController'),
  PortfolioController: Symbol.for('PortfolioController'),

  // Services
  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),
  IWorkExperienceService: Symbol.for('IWorkExperienceService'),
  ISkillService: Symbol.for('ISkillService'),
  IProjectService: Symbol.for('IProjectService'),
  IPortfolioService: Symbol.for('IPortfolioService'),


  // Repositories
  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUserRepository: Symbol.for('IUserRepository'),
  IWorkExperienceRepository: Symbol.for('IWorkExperienceRepository'),
  ISkillRepository: Symbol.for('ISkillRepository'),
  IProjectRepository: Symbol.for('IProjectRepository'),
  IPortfolioRepository: Symbol.for('IPortfolioRepository'),
};
