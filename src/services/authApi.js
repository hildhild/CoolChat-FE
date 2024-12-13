import axios from './axios';

export const loginApi = (email, password) => {
    return axios.post(`/auth/login/`, {"email": email, "password": password});
}

export const signupApi = (step, signupData) => {
    if (step === "create") {
        return axios.post(`/auth/register/`, {
            "organization_action": step,
            "name": signupData.name,
            "description": signupData.description,
            "contact_email": signupData.contact_email,
            "contact_phone": signupData.contact_phone,
            "email": signupData.email,
            "password": signupData.password,
            "password2": signupData.password2,
            "user_name": signupData.user_name,
            "user_phone": signupData.user_phone
        });
    } else if (step === "join") {
        return axios.post(`/auth/register/`, {
            "organization_action": step,
            "invite_code": signupData.invite_code,
            "password": signupData.password,
            "password2": signupData.password2,
            "user_name": signupData.user_name,
            "user_phone": signupData.user_phone
        });
    }
}

export const verifyEmailApi = (token) => {
    return axios.post(`/auth/verify-email/`, {"token": token});
}

export const forgotPasswordApi = (email) => {
    return axios.post(`/auth/password/reset/`, {"email": email});
}

export const resetPasswordApi = (token, new_password, new_password2) => {
    return axios.post(`/auth/password/reset/confirm/`, {"token": token, "new_password": new_password, "new_password2": new_password2});
}



