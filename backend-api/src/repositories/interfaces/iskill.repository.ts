import { CreateSkillModel, UpdateSkillModel } from '../../models/skill.model';
import { SkillFilterParams } from '../../params/skill.params';
import { Skill } from '../../prisma/generated';

export interface ISkillRepository {
  findAll(filters?: SkillFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ skills: Skill[]; total: number; page: number; limit: number; totalPages: number }>;
  findById(id: number): Promise<Skill | null>;
  findByUserId(userId: string): Promise<Skill[]>;
  create(data: CreateSkillModel): Promise<Skill>;
  update(id: number, data: UpdateSkillModel): Promise<Skill | null>;
  delete(id: number): Promise<Skill | null>;
}
