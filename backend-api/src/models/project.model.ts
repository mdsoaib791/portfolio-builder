
export interface CreateProjectModel {
  userId: string;
  title: string;
  description?: string;
  url?: string;
  technologies?: string;
  startDate: Date;
  endDate?: Date;
}

export interface UpdateProjectModel extends Partial<CreateProjectModel> { }

export interface Project extends CreateProjectModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
