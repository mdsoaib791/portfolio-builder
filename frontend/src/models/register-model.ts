export default interface RegisterModel {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    phoneCountryCode?: string;
    // Frontend-only validation fields
    confirmPassword: string;
    agreeToTerms: boolean;
}

