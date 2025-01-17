import axios from './axios';

export const getUserInfoApi = () => {
    return axios.get(`/users/info/`);
}

export const editUserInfoApi = (name, avatar, phone_number) => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);
    if (phone_number) formData.append("phone_number", phone_number);
    return axios.patch(`/users/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}

export const changePasswordApi = (current_password, new_password, new_password2) => {
    return axios.post(`/auth/password/change/`, {
        current_password: current_password,
        new_password: new_password,
        new_password2: new_password2
    });
}



