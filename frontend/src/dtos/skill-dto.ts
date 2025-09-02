export interface SkillDto {
    id: number;
    userId: string;
    name: string;
    logo?: string;
    level?: string | null;
    description?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface CreateSkillDto extends Omit<SkillDto, 'id' | 'createdAt' | 'updatedAt'> { }

export interface UpdateSkillDto extends Partial<CreateSkillDto> { }
