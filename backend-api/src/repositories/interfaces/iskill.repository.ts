import { CreateSkillDto, SkillDto, UpdateSkillDto } from '../../dtos/skill.dto';

export interface ISkillRepository {
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ skills: SkillDto[]; total: number; page: number; limit: number; totalPages: number }>;
  findById(id: string): Promise<SkillDto | null>;
  create(data: CreateSkillDto): Promise<SkillDto>;
  update(id: string, data: UpdateSkillDto): Promise<SkillDto | null>;
  delete(id: string): Promise<SkillDto | null>;
}
