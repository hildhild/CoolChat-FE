import axios from './axios';

const loginApi = (email, password) => {
    return axios.post(`/auth/login/`, {"email": email, "password": password});
}

const signupApi = (step, signupData) => {
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
            "invitation_token": signupData.invitation_token,
            "email": signupData.email,
            "password": signupData.password,
            "password2": signupData.password2,
            "user_name": signupData.user_name,
            "user_phone": signupData.user_phone
        });
    }
}

const verifyEmailApi = (token) => {
    return axios.post(`/auth/verify-email/`, {"token": token});
}

const forgotPasswordApi = (email) => {
    return axios.post(`/auth/password/reset/`, {"email": email});
}

const resetPasswordApi = (token, new_password, new_password2) => {
    return axios.post(`/auth/password/reset/confirm/`, {"token": token, "new_password": new_password, "new_password2": new_password2});
}

export {signupApi, verifyEmailApi, loginApi, forgotPasswordApi, resetPasswordApi}


