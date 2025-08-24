import * as Yup from 'yup';
import { CreateWorkExperienceModel } from '../models/work-experience.model';

const CreateWorkExperienceValidator: Yup.ObjectSchema<CreateWorkExperienceModel> = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  companyName: Yup.string().required('Company name is required'),
  position: Yup.string().required('Position is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().optional(),
  description: Yup.string().optional(),
  location: Yup.string().optional(),
});

export default CreateWorkExperienceValidator;
