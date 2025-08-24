import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { CreateSkillDto, SkillDto, UpdateSkillDto } from '../dtos/skill.dto';
import { ISkillRepository } from '../repositories/interfaces/iskill.repository';
import { ISkillService } from './interfaces/iskill.service';

@injectable()
export class SkillService implements ISkillService {
  constructor(@inject(TYPES.ISkillRepository) private skillRepository: ISkillRepository) { }

  async findById(id: string): Promise<SkillDto | null> {
    return this.skillRepository.findById(id);
  }

  async findAll(
    filters?: any,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ) {
    return this.skillRepository.findAll(filters, page, limit, sortBy, sortOrder);
  }

  async create(data: CreateSkillDto): Promise<SkillDto | null> {
    return this.skillRepository.create(data);
  }

  async update(id: string, data: UpdateSkillDto): Promise<SkillDto | null> {
    return this.skillRepository.update(id, data);
  }

  async delete(id: string): Promise<SkillDto | null> {
    return this.skillRepository.delete(id);
  }
}
