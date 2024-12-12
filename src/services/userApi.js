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



