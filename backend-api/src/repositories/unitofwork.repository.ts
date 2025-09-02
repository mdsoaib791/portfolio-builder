import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import prisma from '../prisma';
import { Prisma } from '../prisma/generated';
import IUnitOfWork from './interfaces/iunitofwork.repository';
import { IUserRepository } from './interfaces/iuser.repository';
import { IProjectRepository } from './interfaces/iproject.repository';
import { ISkillRepository } from './interfaces/iskill.repository';
import { IWorkExperienceRepository } from './interfaces/iwork-experience.repository';

export default class UnitOfWork implements IUnitOfWork {
  public User: IUserRepository;
  public Project: IProjectRepository;
  public Skill: ISkillRepository;
  public WorkExperience: IWorkExperienceRepository;

  constructor(user = container.get<IUserRepository>(TYPES.IUserRepository), project = container.get<IProjectRepository>(TYPES.IProjectRepository), skill = container.get<ISkillRepository>(TYPES.ISkillRepository), workExperience = container.get<IWorkExperienceRepository>(TYPES.IWorkExperienceRepository)) {
    this.User = user;
    this.Project = project;
    this.Skill = skill;
    this.WorkExperience = workExperience;
  }

  /**
   * Executes a set of operations within a database transaction.
   *
   * @param callback - A function that receives a Prisma transaction client and performs database operations.
   * @returns A promise that resolves to the result of the transaction.
   */
  async transaction<T>(callback: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return prisma.$transaction(async (transactionClient) => {
      return callback(transactionClient);
    });
  }
}
