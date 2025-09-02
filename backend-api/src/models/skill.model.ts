
export interface CreateSkillModel {
  userId: string;
  name: string;
  level?: string;
  description?: string;
}

export interface UpdateSkillModel extends Partial<CreateSkillModel> { }

export interface Skill {
  id: number;
  userId: string;
  name: string;
  level: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
