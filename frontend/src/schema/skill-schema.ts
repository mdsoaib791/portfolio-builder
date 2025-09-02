import { SkillModel } from "@/models/skill-model";
import * as Yup from "yup";

const SkillSchema = Yup.object().shape({
    userId: Yup.string().required("User authentication required"),
    name: Yup.string()
        .trim()
        .min(2, "Skill name must be at least 2 characters")
        .max(100, "Skill name must not exceed 100 characters")
        .required("Skill name is required"),
    level: Yup.string()
        .trim()
        .optional(),
    description: Yup.string()
        .trim()
        .max(500, "Description must not exceed 500 characters")
        .optional(),
});

export default SkillSchema;
