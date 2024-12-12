import axios from './axios';

export const getUserInfoApi = () => {
    return axios.get(`/users/info/`);
}

export const editUserInfoApi = (name, avatar) => {
    return axios.put(`/users/update/`, {
        name: name,
        ...(avatar ? {avatar: avatar} : {})
    });
}

export const changePasswordApi = (current_password, new_password, new_password2) => {
    return axios.post(`/auth/password/change/`, {
        current_password: current_password,
        new_password: new_password,
        new_password2: new_password2
    });
}



