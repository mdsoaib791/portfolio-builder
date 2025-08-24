export interface CreateWorkExperienceModel {
  userId: string;
  companyName: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  location?: string;
}
