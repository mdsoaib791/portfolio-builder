import { CreateSkillDto, SkillDto, UpdateSkillDto } from '../../dtos/skill.dto';

export interface ISkillService {
  findById(id: string): Promise<SkillDto | null>;
  findAll(filters?: any, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<{ skills: SkillDto[]; total: number; page: number; limit: number; totalPages: number }>;
  create(data: CreateSkillDto): Promise<SkillDto | null>;
  update(id: string, data: UpdateSkillDto): Promise<SkillDto | null>;
  delete(id: string): Promise<SkillDto | null>;
}
