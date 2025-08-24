import { CreateSkillModel, Skill, UpdateSkillModel } from '../../models/skill.model';

export interface ISkillRepository {
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ skills: Skill[]; total: number; page: number; limit: number; totalPages: number }>;
  findById(id: string): Promise<Skill | null>;
  create(data: CreateSkillModel): Promise<Skill>;
  update(id: string, data: UpdateSkillModel): Promise<Skill | null>;
  delete(id: string): Promise<Skill | null>;
}
