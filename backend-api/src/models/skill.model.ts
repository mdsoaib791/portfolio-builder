
export interface CreateSkillModel {
  userId: string;
  name: string;
  level?: string;
  description?: string;
}

export interface UpdateSkillModel extends Partial<CreateSkillModel> { }

export interface Skill extends CreateSkillModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
