export const TYPES = {
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),

  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),

  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUserRepository: Symbol.for('IUserRepository'),
  WorkExperienceController: Symbol.for('WorkExperienceController'),
  IWorkExperienceService: Symbol.for('IWorkExperienceService'),
  IWorkExperienceRepository: Symbol.for('IWorkExperienceRepository'),
  IUnitOfWorkWorkExperience: Symbol.for('IUnitOfWorkWorkExperience'),
};
