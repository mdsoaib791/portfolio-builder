import { WorkExperienceModel } from "@/models/work-experience-model";
import * as Yup from "yup";

const WorkExperienceSchema = Yup.object().shape({
    userId: Yup.string().required("User authentication required"),
    companyName: Yup.string()
        .trim()
        .min(2, "Company name must be at least 2 characters")
        .max(100, "Company name must not exceed 100 characters")
        .required("Company name is required"),
    position: Yup.string()
        .trim()
        .min(2, "Position must be at least 2 characters")
        .max(100, "Position must not exceed 100 characters")
        .required("Position is required"),
    startDate: Yup.string()
        .required("Start date is required"),
    endDate: Yup.string()
        .optional()
        .nullable()
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
    description: Yup.string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),
    location: Yup.string()
        .trim()
        .max(100, "Location must not exceed 100 characters")
        .optional(),
});

export default WorkExperienceSchema;