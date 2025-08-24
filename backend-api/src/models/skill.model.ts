export interface Skill {
  id: string;
  userId: string;
  name: string;
  level?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
