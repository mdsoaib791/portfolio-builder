import * as Yup from 'yup';
import { Project } from '../models/project.model';

const ProjectValidator: Yup.ObjectSchema<Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'user'>> = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  title: Yup.string().required('Project title is required'),
  description: Yup.string().optional(),
  url: Yup.string().optional(),
  technologies: Yup.string().optional(),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().optional(),
});

export default ProjectValidator;
