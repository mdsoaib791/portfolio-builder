import LoginModel from "@/models/login-model";
import * as Yup from "yup";

const LoginSchema: Yup.ObjectSchema<LoginModel> = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required("Email is required"),
  password: Yup.string().required("Password is required"),
  rememberMe: Yup.boolean().required(),
});

export default LoginSchema;
