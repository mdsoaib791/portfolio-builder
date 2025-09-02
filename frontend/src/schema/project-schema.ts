import { ProjectModel } from "@/models/project-model";
import * as Yup from "yup";

const ProjectSchema = Yup.object().shape({
    userId: Yup.string().required("User authentication required"),
    title: Yup.string()
        .trim()
        .min(2, "Project title must be at least 2 characters")
        .max(100, "Project title must not exceed 100 characters")
        .required("Project title is required"),
    description: Yup.string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),
    url: Yup.string()
        .trim()
        .url("Please enter a valid URL")
        .optional(),
    technologies: Yup.string()
        .trim()
        .max(500, "Technologies must not exceed 500 characters")
        .optional(),
    startDate: Yup.string()
        .required("Start date is required"),
    endDate: Yup.string()
        .optional()
        .test(
            'is-after-start',
            'End date must be after start date',
            function (value) {
                const { startDate } = this.parent;
                if (!value || !startDate) return true;

                const start = new Date(startDate);
                const end = new Date(value);
                return end > start;
            }
        ),
});

export default ProjectSchema;
