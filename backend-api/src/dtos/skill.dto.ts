

export interface SkillDto {
  id: number;
  userId: string;
  name: string;
  level: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSkillDto extends Omit<SkillDto, 'id' | 'createdAt' | 'updatedAt'> { }
export interface UpdateSkillDto extends Partial<CreateSkillDto> { }
