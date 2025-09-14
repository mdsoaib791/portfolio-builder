import RegisterModel from "@/models/register-model";
import * as Yup from "yup";

const RegisterSchema: Yup.ObjectSchema<RegisterModel> = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email('Invalid email address')
        .required("Email is required"),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        )
        .required("Password is required"),
    firstName: Yup.string()
        .trim()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .optional(),
    lastName: Yup.string()
        .trim()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .optional(),
    phoneNumber: Yup.string()
        .trim()
        .matches(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')
        .optional(),
    phoneCountryCode: Yup.string()
        .trim()
        .optional(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("Please confirm your password"),
    agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must agree to the terms and conditions')
        .required("You must agree to the terms and conditions"),
});

export default RegisterSchema;
