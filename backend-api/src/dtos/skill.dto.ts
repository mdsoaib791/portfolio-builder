export interface SkillDto {
  id: string;
  userId: string;
  name: string;
  level?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSkillDto extends Omit<SkillDto, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateSkillDto extends Partial<CreateSkillDto> { }
