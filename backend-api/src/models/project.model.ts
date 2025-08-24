export interface Project {
  id: string;
  userId: string;
  title: string;
  description?: string;
  url?: string;
  technologies?: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
