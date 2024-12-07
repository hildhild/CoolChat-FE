import axios from './axios';

const loginApi = (email, password) => {
    return axios.post(`/auth/login/`, {"email": email, "password": password});
}

const signupApi = (email, password, password2, name) => {
    return axios.post(`/auth/register/`, {"email": email, "password": password, "password2": password2, "name": name});
}

const verifyEmailApi = (token) => {
    return axios.post(`/auth/verify-email/`, {"token": token});
}

export {signupApi, verifyEmailApi, loginApi}


