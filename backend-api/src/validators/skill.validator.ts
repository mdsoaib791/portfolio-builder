import * as Yup from 'yup';
import { Skill } from '../models/skill.model';

const SkillValidator: Yup.ObjectSchema<Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'user'>> = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  name: Yup.string().required('Skill name is required'),
  level: Yup.string().nullable().defined(),
  description: Yup.string().nullable().defined(),
});

export default SkillValidator;
