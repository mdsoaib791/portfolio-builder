import { CreateSkillModel, Skill, UpdateSkillModel } from '../../models/skill.model';

export interface ISkillService {
  findById(id: number): Promise<Skill | null>;
  findByUserId(userId: string): Promise<Skill[]>;
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ skills: Skill[]; total: number; page: number; limit: number; totalPages: number }>;
  create(data: CreateSkillModel): Promise<Skill | null>;
  update(id: number, data: UpdateSkillModel): Promise<Skill | null>;
  delete(id: number): Promise<Skill | null>;
}
