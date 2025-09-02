import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { CreateSkillModel, Skill, UpdateSkillModel } from '../models/skill.model';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { ISkillService } from './interfaces/iskill.service';

@injectable()
export class SkillService implements ISkillService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async findById(id: number): Promise<Skill | null> {
    return this.unitOfWork.Skill.findById(id);
  }
  async findByUserId(userId: string): Promise<Skill[]> {
    return this.unitOfWork.Skill.findByUserId(userId);
  }

  async findAll(
    filters?: any,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ) {
    return this.unitOfWork.Skill.findAll(filters, page, limit, sortBy, sortOrder);
  }

  async create(data: CreateSkillModel): Promise<Skill | null> {
    return this.unitOfWork.Skill.create({
      userId: data.userId,
      name: data.name,
      level: data.level || "Beginner",
      description: data.description || undefined,
    });
  }

  async update(id: number, data: UpdateSkillModel): Promise<Skill | null> {
    return this.unitOfWork.Skill.update(id, data);
  }

  async delete(id: number): Promise<Skill | null> {
    return this.unitOfWork.Skill.delete(id);
  }
}
